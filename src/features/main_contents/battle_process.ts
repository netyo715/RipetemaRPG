import { MonsterId } from "../../data/define/monster";
import { BattleAction, BattleUnit } from "./battle_unit";
import { Character } from "../../types/character";
import { getMonster } from "../../utils/utils";
import { SkillId } from "../../data/define/skill";

/**
 * 戦闘の内部処理を行うクラス
 * 戦う相手が決まってから終了するまでを管理する
 */
export class BattleProcess {
  sendLog: (log: string) => void
  onWin: () => void
  onLose: () => void
  onEnd: () => void
  isBattling = false;
  setTimeoutHandler: NodeJS.Timeout|null = null;
  allyUnits: BattleUnit[] = [];
  enemyUnits: BattleUnit[] = [];
  readonly INTERVAL = 16;

  constructor(initialCharacters: Character[], monsterIds: MonsterId[], sendLog: (log: string) => void, onWin: () => void, onLose: () => void, onEnd: () => void) {
    this.isBattling = true;
    this.sendLog = sendLog;
    this.onWin = onWin;
    this.onLose = onLose;
    this.onEnd = onEnd;
    this.allyUnits = initialCharacters.map((character, index) => {
      return new BattleUnit(this, index, true, character.name, character.status, [SkillId.TestAttack]); // TODO skillIds
    });
    this.enemyUnits = monsterIds.map((id) => getMonster(id)).map((monster, index) => {
      return new BattleUnit(this, index, false, monster.name, monster.status, []); // TODO skillIds
    });
    this.sendLog("戦闘開始"); // TODO ○○が現れた！とかかも
    this.setTimeoutHandler = setTimeout(this.turn.bind(this), this.INTERVAL);
  }

  close(){
    this.isBattling = false;
    clearTimeout(this.setTimeoutHandler!);
  }

  turn(){
    // 行動の集約と時間経過
    const battleActions: BattleAction[] = [];
    Object.values(this.allyUnits).forEach((units) => {
      units.battleActions.forEach((battleAction) => {
        battleActions.push(battleAction);
      });
    });
    Object.values(this.enemyUnits).forEach((units) => {
      units.battleActions.forEach((battleAction) => {
        battleActions.push(battleAction);
      });
    });

    // 時間経過させる処理
    let remainingTime = this.INTERVAL;
    while (remainingTime > 0){
      // クールダウン順に並べる
      battleActions.sort((a, b) => {
        return a.coolDown - b.coolDown;
      });
      // どれだけ時間が過ぎるか決める
      const reduceTime = Math.min(remainingTime, battleActions[0].coolDown);
      remainingTime -= reduceTime;
      battleActions.forEach((action) => {
        action.coolDown -= reduceTime;
      });
      // 残りクールダウンが0になったものだけ行動
      for(let action of battleActions){
        if (action.coolDown > 0){
          break;
        }
        action.execution();
        // 戦闘終了チェック
        if (this.isAllDead(this.enemyUnits)){
          this.onWin();
          this.close();
          return;
        }
        if (this.isAllDead(this.allyUnits)){
          this.onLose();
          this.close();
          return;
        }
      }
    }
    // 処理中にcloseされているかもしれないのでチェックする
    if (this.isBattling){
      this.setTimeoutHandler = setTimeout(this.turn.bind(this), this.INTERVAL);    
    }
    return;
  }

  isAllDead(units: BattleUnit[]): boolean{
    return units.every(unit => unit.isDead);
  }
}