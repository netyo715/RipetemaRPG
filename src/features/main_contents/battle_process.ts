import { MonsterId } from "../../data/define/monster";
import { BattleAction, BattleUnit } from "./battle_unit";
import { Character } from "../../types/character";
import { getMonster } from "../../utils/utils";

export class BattleProcess {
  sendLog: (log: string) => void
  isBattling = false;
  isWin = false;
  setTimeoutHandler: NodeJS.Timeout|null = null;
  allyUnits: BattleUnit[] = [];
  enemyUnits: BattleUnit[] = [];
  readonly INTERVAL = 16;

  constructor(initialCharacters: Character[], monsterIds: MonsterId[], sendLog: (log: string) => void) {
    this.isBattling = true;
    this.sendLog = sendLog;
    this.allyUnits = initialCharacters.map((character, index) => {
      return new BattleUnit(this, index, true, character.name, character.status, []); // TODO skillIds
    });
    this.enemyUnits = monsterIds.map((id) => getMonster(id)).map((monster, index) => {
      return new BattleUnit(this, index, false, monster.name, monster.status, []); // TODO skillIds
    });
    this.sendLog("戦闘開始");
    this.setTimeoutHandler = setTimeout(this.turn.bind(this), this.INTERVAL);
  }

  close(){
    this.isBattling = false;
    clearTimeout(this.setTimeoutHandler!);
  }

  turn(){
    // 行動の集約と時間経過
    // TODO 最小coolDown分だけ時間を進める→行動 を繰り返すようにしないといけない
    const battleActions: BattleAction[] = [];
    Object.values(this.allyUnits).forEach((units) => {
      units.battleActions.forEach((battleAction) => {
        battleAction.coolDown -= this.INTERVAL;
        battleActions.push(battleAction);
      });
    });
    Object.values(this.enemyUnits).forEach((units) => {
      units.battleActions.forEach((battleAction) => {
        battleAction.coolDown -= this.INTERVAL;
        battleActions.push(battleAction);
      });
    });
    // 起こった順に処理
    battleActions.sort((a, b) => {
      return a.coolDown - b.coolDown;
    });
    while (battleActions[0].coolDown <= 0) {
      battleActions[0].execution();
      if (this.isAllDead(this.enemyUnits)){
        this.sendLog("勝利した！");
        this.close();
        return;
      }
      if (this.isAllDead(this.allyUnits)){
        this.sendLog("全滅した…");
        this.close();
        return;
      }
      battleActions.sort((a, b) => {
        return a.coolDown - b.coolDown;
      });
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