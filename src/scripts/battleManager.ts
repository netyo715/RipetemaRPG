import { AdventurerData } from "../types/game";
import { BattleUnit, BattleUnitForView } from "../types/battle";
import {
  createBattleUnitFromAdventurer,
  createBattleUnitFromMonsterId,
} from "./battle";
import { MonsterId } from "../data/monster";
import { Dispatch, SetStateAction } from "react";

const TURN_INTERVAL = 100;

/**
 * 戦闘を管理するクラス
 */
export class BattleManager {
  sendLog: (log: string) => void;
  setAdventurerUnitForViews: Dispatch<
    SetStateAction<BattleUnitForView[] | undefined>
  >;
  setMonsterUnitForViews: Dispatch<
    SetStateAction<BattleUnitForView[] | undefined>
  >;
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
    setAdventurerUnitForViews: Dispatch<
      SetStateAction<BattleUnitForView[] | undefined>
    >,
    setMonsterUnitForViews: Dispatch<
      SetStateAction<BattleUnitForView[] | undefined>
    >,
    restart: () => void,
    onEnd: (isWin: boolean) => void
  ) {
    this.sendLog = sendLog;
    this.setAdventurerUnitForViews = setAdventurerUnitForViews;
    this.setMonsterUnitForViews = setMonsterUnitForViews;
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
      // リキャストタイムを減らす
      for (const unit of [...this.adventurerUnits, ...this.monsterUnits]) {
        for (const action of unit.activeActions) {
          if (!unit.isAlive) continue; // 死んでいるユニットはリキャストタイムが変わらない
          action.remainingRecastTime -= elapsedTime;
        }
      }
      // 残りリキャストタイムが0のアクション実行
      // 全滅でbreak
      if (this.doAction()) break;
    }

    // 描画
    this.view();

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
   * リキャストタイムが0になったアクションを行う
   * @returns 全滅したならtrue
   */
  doAction(): boolean {
    for (const unit of [...this.adventurerUnits, ...this.monsterUnits]) {
      for (const action of unit.activeActions) {
        if (!unit.isAlive) continue;
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
          if (
            this.monsterUnits.every((unit) => !unit.isAlive) ||
            this.adventurerUnits.every((unit) => !unit.isAlive)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * 戦闘を開始する
   */
  run() {
    this.view();
    this.turnHandler = setTimeout(this.turn.bind(this), TURN_INTERVAL);
  }

  /**
   * 描画更新
   */
  view() {
    this.setAdventurerUnitForViews(
      this.adventurerUnits.map((unit) => {
        return {
          name: unit.name,
          hp: unit.status.hp,
          currentHp: unit.status.currentHp,
        };
      })
    );
    this.setMonsterUnitForViews(
      this.monsterUnits.map((unit) => {
        return {
          name: unit.name,
          hp: unit.status.hp,
          currentHp: unit.status.currentHp,
        };
      })
    );
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
