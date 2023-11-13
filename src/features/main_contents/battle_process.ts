import { MonsterId } from "../../data/define/monster";
import { BattleAction, BattleUnit } from "../../types/battle_unit";
import { Character } from "../../types/character";
import { getMonster } from "../../utils/utils";

export class BattleProcess {
  sendLog: (log: string) => void
  isBattling = false;
  setTimeoutHandler: NodeJS.Timeout|null = null;
  private allyUnits: BattleUnit[] = [];
  private enemyUnits: BattleUnit[] = [];

  constructor(sendLog: (log: string) => void) {
    this.sendLog = sendLog;
  }

  start(initialCharacters: Character[], monsterIds: MonsterId[]) {
    if(this.isBattling) return;
    this.isBattling = true;
    this.allyUnits = initialCharacters.map((character, index) => {
      return new BattleUnit(index, character.name, character.status);
    });
    this.enemyUnits = monsterIds.map((id) => getMonster(id)).map((monster, index) => {
      return new BattleUnit(index, monster.name, monster.status);
    });
    console.log("set");
    this.setTimeoutHandler = setTimeout(this.turn.bind(this), 0, 0);
  }

  close(){
    this.isBattling = false;
    clearTimeout(this.setTimeoutHandler!);
  }

  turn(elapsedTime: number){
    console.log(elapsedTime);
    const battleActions: BattleAction[] = [];
    Object.values(this.allyUnits).forEach((units) => {
      units.battleActions.forEach((battleAction) => {
        battleAction.coolDown -= elapsedTime;
        battleActions.push(battleAction);
      });
    });
    Object.values(this.enemyUnits).forEach((units) => {
      units.battleActions.forEach((battleAction) => {
        battleAction.coolDown -= elapsedTime;
        battleActions.push(battleAction);
      });
    });
    battleActions.sort((a, b) => {
      return a.coolDown - b.coolDown;
    });
    for (let i = 0; i < battleActions.length; i++) {
      const battleAction = battleActions[i];
      if(battleAction.coolDown > 0){
        break;
      };
      this.sendLog(battleAction.action(this.allyUnits, this.enemyUnits));
    }
    battleActions.sort((a, b) => {
      return a.coolDown - b.coolDown;
    });
    this.setTimeoutHandler = setTimeout(this.turn.bind(this), battleActions[0].coolDown, battleActions[0].coolDown);    
    return;
  }
}