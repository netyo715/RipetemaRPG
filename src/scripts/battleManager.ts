import { AdventurerData } from "../types/game";
import { BattleUnit } from "../types/battle";
import {
  createBattleUnitFromAdventurer,
  createBattleUnitFromMonsterId,
} from "../utilities/battle";
import { MonsterId } from "../data/monster";

const TURN_INTERVAL = 50;

/**
 * 戦闘を管理するクラス
 */
export class BattleManager {
  sendLog: (log: string) => void;
  restart: () => void;
  onEnd: (isWin: boolean) => void;

  turnHandler?: ReturnType<typeof setTimeout> = undefined;
  isClosed: Boolean = false;
  adventurerUnits: BattleUnit[] = [];
  monsterUnits: BattleUnit[] = [];

  constructor(
    adventurerData: AdventurerData,
    monsterIds: MonsterId[],
    sendLog: (log: string) => void,
    restart: () => void,
    onEnd: (isWin: boolean) => void
  ) {
    this.sendLog = sendLog;
    this.restart = restart;
    this.onEnd = onEnd;

    this.adventurerUnits = adventurerData.map((adventurer) =>
      createBattleUnitFromAdventurer(adventurer)
    );
    this.monsterUnits = monsterIds.map((monsterId) =>
      createBattleUnitFromMonsterId(monsterId)
    );

    this.run();
  }

  /**
   * 各フレーム毎の処理
   */
  private turn() {
    if (this.isClosed) return;

    // アクション
    let remainingTime: number = TURN_INTERVAL; // このフレームで処理する時間の残り
    while (remainingTime > 0) {
      // 処理する時間
      // 一番早いアクションの時間とTURN_INTERVALの残りのmin
      const elapsedTime = Math.min(
        remainingTime,
        ...[...this.adventurerUnits, ...this.monsterUnits]
          .filter((unit) => unit.isAlive)
          .map((unit) =>
            Math.min(
              ...unit.activeActions.map((action) => action.remainingRecastTime)
            )
          )
      );
      remainingTime -= elapsedTime;
      // アクション実行
      // スキルが途中で増減したりリキャストタイムが変わったら壊れるかも
      [...this.adventurerUnits, ...this.monsterUnits]
        .filter((unit) => unit.isAlive)
        .forEach((unit) => {
          unit.activeActions.forEach((action) => {
            action.remainingRecastTime -= elapsedTime;
            // 残りリキャストタイムが0になったら
            if (action.remainingRecastTime <= 0) {
              action.remainingRecastTime = action.recastTime;
              if (unit.isAdventurer) {
                action.effect(
                  unit,
                  this.adventurerUnits,
                  this.monsterUnits,
                  this.sendLog
                );
              } else {
                action.effect(
                  unit,
                  this.monsterUnits,
                  this.adventurerUnits,
                  this.sendLog
                );
              }
            }
          });
        });
    }

    // 描画

    // 戦闘終了判定
    // 勝利
    if (this.monsterUnits.every((unit) => !unit.isAlive)) {
      this.end(true);
      return;
    }
    // 敗北
    if (this.adventurerUnits.every((unit) => !unit.isAlive)) {
      this.end(false);
      return;
    }

    // 次のフレーム
    this.turnHandler = setTimeout(this.turn.bind(this), TURN_INTERVAL);
  }

  /**
   * 戦闘を開始する
   */
  run() {
    this.turnHandler = setTimeout(this.turn.bind(this), TURN_INTERVAL);
  }

  /**
   * 勝敗処理
   */
  end(isWin: boolean) {
    this.onEnd(isWin);
    this.close();
    this.restart();
  }

  /**
   * 戦闘終了
   */
  close() {
    this.isClosed = true;
    clearTimeout(this.turnHandler);
  }
}
