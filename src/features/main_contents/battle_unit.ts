import { Status } from "../../types/status";
import { getValueRandom } from "../../utils/utils";
import { BattleProcess } from "./battle_process";

/**
 * @param onAttackEffects 攻撃時の処理
 * @param onDefenceEffects 攻撃を受ける直前の処理
 * @param onHitEffects 攻撃命中時の処理
 * @param onDamagedEffects ダメージを受けたときの処理
 */
export class BattleUnit {
  battle: BattleProcess
  unitId: number
  isAlly: boolean
  name: string
  defaultStatus: Status
  battleStatus: BattleStatus
  battleActions: BattleAction[]
  onAttackEffects: AttackEffect[] = [];
  onDefenceEffects: AttackEffect[] = [];
  onHitEffects: AttackEffect[] = [];
  onDamagedEffects: AttackEffect[] = [];
  isDead = false;

  constructor(
    battle: BattleProcess,
    unitId: number,
    isAlly: boolean,
    name: string,
    defaultStatus: Status,
    skillIds: any, // TODO skillIds使ってスキル情報取得
    ) {
    this.battle = battle;
    this.unitId = unitId;
    this.isAlly = isAlly;
    this.name = name;
    this.defaultStatus = defaultStatus;
    this.battleStatus = {maxHp: defaultStatus.hp, ...defaultStatus}
    this.battleActions = [
      // 通常攻撃
      new BattleAction(
        battle,
        this,
        BattleActionType.Normal,
        Math.floor(1000 / (this.battleStatus.spd/20)),
        (action: BattleAction, battle: BattleProcess) => {
          const actioner = action.actioner;
          battle.sendLog(`${actioner.name}の攻撃！`);
          const targetTeam = actioner.isAlly ? battle.enemyUnits : battle.allyUnits;
          const target = getValueRandom(targetTeam.filter((unit: BattleUnit) => !unit.isDead));
          const damage = action.causeDamage({
            type: BattleActionType.Normal,
            physicalDamage: actioner.battleStatus.atk,
            magicDamage: 0,
          }, target);
          battle.sendLog(`${target.name}に${damage}ダメージ！`)
        })
    ];
  }
  reduceHp(damage: number){
    this.battleStatus.hp -= damage;
    if(this.battleStatus.hp <= 0){
      this.battleStatus.hp = 0;
      this.isDead = true;
    }
  }
}

export enum BattleActionType {
  Normal,
  Skill,
}

export class BattleAction {
  battle: BattleProcess
  actioner: BattleUnit
  actionType: BattleActionType
  maxCoolDown: number
  coolDown: number
  execution: () => void

  constructor(
    battle: BattleProcess,
    actioner: BattleUnit,
    actionType: BattleActionType,
    maxCoolDown: number,
    execution: (action: BattleAction, battle: BattleProcess) => void
    ){
    this.battle = battle;
    this.actioner = actioner;
    this.actionType = actionType;
    this.maxCoolDown = maxCoolDown;
    this.coolDown = maxCoolDown;
    this.execution = () => {
      execution(this, this.battle);
      this.coolDown = this.maxCoolDown;
    };
  }
  /**
   * 指定したユニットにダメージを与える
   * @param damageSource 
   * @param targetUnit 
   * @returns 与えたダメージ
   */
  causeDamage(damageSource: DamageSource, targetUnit: BattleUnit): Number{
    let damage = new Damage(damageSource)
    // 攻撃時処理
    // 守備時処理
    const calculatedPhysicalDamage = Math.max(Math.floor(damage.totalPhysicalDamage() - targetUnit.battleStatus.def / 2), 0);
    const calculatedMagicDamage = Math.max(Math.floor(damage.totalMagicDamage() - targetUnit.battleStatus.mdf / 2), 0);
    const totalDamage = calculatedPhysicalDamage+calculatedMagicDamage;
    targetUnit.reduceHp(totalDamage);
    // 命中時攻撃側処理
    // 命中時守備側処理
    return totalDamage;
  }
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

class Damage {
  trigger: DamageSource
  otherSources: DamageSource[]
  constructor(trigger: DamageSource){
    this.trigger = trigger;
    this.otherSources = [];
  }
  totalPhysicalDamage(): number{
    return this.trigger.physicalDamage + this.otherSources.reduce(
      (acc: number, source: DamageSource): number => {
        return acc + source.physicalDamage;
      }, 0);
  }
  totalMagicDamage(): number{
    return this.trigger.magicDamage + this.otherSources.reduce(
      (acc: number, source: DamageSource): number => {
        return acc + source.magicDamage;
      }, 0);
  }
}

type DamageSource = {
  type: BattleActionType, // TODO
  physicalDamage: number,
  magicDamage: number,
}

type AttackEffect = (damage: Damage, actionUnit: BattleUnit, targetUnit: BattleUnit) => Damage