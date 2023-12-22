import { SkillId } from "../../data/define/skill";
import { Status } from "../../types/status";
import { getActiveSkill, getRandomValue } from "../../utils/utils";
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
    skillIds: SkillId[],
    ) {
    this.battle = battle;
    this.unitId = unitId;
    this.isAlly = isAlly;
    this.name = name;
    this.defaultStatus = defaultStatus;
    this.battleStatus = {maxHp: defaultStatus.hp, ...defaultStatus}
    this.battleActions = [];
    this.battleActions.push(
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
          const target = getRandomValue(targetTeam.filter((unit: BattleUnit) => !unit.isDead));
          let isCritical = actioner.battleStatus.crt >= Math.random()*100;
          const damageResult = action.causeDamage(new Damage({
            type: BattleActionType.Normal,
            physicalDamage: actioner.battleStatus.atk,
            magicDamage: 0,
          }, isCritical), [target]);
          const causedDamage = damageResult.causedDamages[0];
          battle.sendLog(`${damageResult.damage.isCritical ? "クリティカル！" : ""} ${target.name}に${causedDamage}ダメージ！`);
        })
    );
    skillIds.forEach((id) => {
      const skill = getActiveSkill(id);
      this.battleActions.push(
        new BattleAction(battle, this, BattleActionType.Skill, skill.coolDown, skill.behavior)
      );
    });
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
   * @param targetUnits
   * @returns 与えたダメージ
   */
  causeDamage(damage: Damage, targetUnits: BattleUnit[]): {causedDamages: Number[], damage: Damage}{
    let causedDamages = new Array(targetUnits.length).fill(0);
    // クリティカル判定
    // 攻撃時処理
    // 守備時処理
    // ダメージを与える
    targetUnits.forEach((target, index) => {
      const totalDamage = damage.totalDamage();
      const calculatedPhysicalDamage = Math.max(Math.floor(totalDamage.physicalDamage - target.battleStatus.def / 2), 0);
      const calculatedMagicDamage = Math.max(Math.floor(totalDamage.magicDamage - target.battleStatus.mdf / 2), 0);
      const calculatedTotalDamage = calculatedPhysicalDamage+calculatedMagicDamage;
      target.reduceHp(calculatedTotalDamage);
      causedDamages[index] += calculatedTotalDamage;
    });
    // 命中時攻撃側処理
    // 命中時守備側処理
    return {causedDamages: causedDamages, damage: damage};
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

export class Damage {
  trigger: DamageSource
  otherSources: DamageSource[]
  isCritical: boolean
  constructor(trigger: DamageSource, isCritical: boolean=false){
    this.trigger = trigger;
    this.otherSources = [];
    this.isCritical = isCritical;
  }
  totalDamage(): {physicalDamage: number, magicDamage: number}{
    let physicalDamage = this.trigger.physicalDamage;
    let magicDamage = this.trigger.magicDamage;
    if(this.isCritical){
      physicalDamage *= 2;
      magicDamage *= 2;
    }
    physicalDamage += this.otherSources.reduce(
      (acc: number, source: DamageSource): number => {
        return acc + source.physicalDamage;
      }, 0);
    magicDamage += this.trigger.magicDamage + this.otherSources.reduce(
      (acc: number, source: DamageSource): number => {
        return acc + source.magicDamage;
      }, 0);
    return {
      physicalDamage: physicalDamage,
      magicDamage: magicDamage,
    }
  }
}

export type DamageSource = {
  type: BattleActionType, // TODO
  physicalDamage: number,
  magicDamage: number,
}

export type AttackEffect = (damage: Damage, actionUnit: BattleUnit, targetUnit: BattleUnit) => Damage