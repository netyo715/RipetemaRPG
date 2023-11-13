import { Status } from "./status";

export class BattleUnit {
  unitId: number
  name: string
  defaultStatus: Status
  battleStatus: BattleStatus
  battleActions: BattleAction[]
  isDead = false;

  constructor(unitId: number, name: string, defaultStatus: Status) {
    this.unitId = unitId;
    this.name = name;
    this.defaultStatus = defaultStatus;
    this.battleStatus = {maxHp: defaultStatus.hp, ...defaultStatus}
    this.battleActions = [{
      maxCoolDown: 650+this.battleStatus.spd*50,
      coolDown: 650+this.battleStatus.spd*50,
      action: (allyUnits, enemyUnits) => {
        this.battleActions[0].coolDown = this.battleActions[0].maxCoolDown;
        return `${this.name}の攻撃！`;
      },
    }];
  }
}

export type BattleAction = {
  maxCoolDown: number,
  coolDown: number,
  action: (allyUnits: BattleUnit[], enemyUnits: BattleUnit[]) => string,
}

export type BattleStatus = {
  maxHp: number,
  hp: number,
  atk: number,
  def: number,
  mat: number,
  mdf: number,
  spd: number,
  crt: number,
}