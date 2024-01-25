import { ActiveAction, ActiveSkill, PassiveSkill } from "./skill";

/**
 * バトルで参照するパラメータ
 * @param id バトル中ユニットの識別に使う
 * @param name 名前
 * @param status 基本ステータス+currentHp
 * @param skillIds 所持スキルのID
 */
export type BattleUnit = {
  id: string;
  name: string;
  status: Status & { currentHp: number };
  activeActions: ActiveAction[];
  passiveSkills: {
    onAttackSkills: PassiveSkill[];
    onHitSkills: PassiveSkill[];
    onDefenceSkills: PassiveSkill[];
    onDamagedSkills: PassiveSkill[];
  };
  isAlive: boolean;
};

/**
 * ステータス
 * @param hp 最大体力
 * @param atk 物理攻撃力
 * @param def 物理守備力
 * @param mat 魔法攻撃力
 * @param mdf 魔法守備力
 * @param spd 通常攻撃速度
 * @param hst スキル発動速度
 * @param crt クリティカル率
 */
export type Status = {
  hp: number;
  atk: number;
  def: number;
  mat: number;
  mdf: number;
  spd: number;
  hst: number;
  crt: number;
};

/**
 * ダメージ
 * @param isCritical クリティカルであるか
 * @param isSkill トリガーはスキルであるか
 * @param damages ダメージの詳細
 */
export type DamageDetail = {
  isCritical: boolean;
  isSkill: boolean;
  damages: Damage[];
};

/**
 * スキル/通常攻撃毎のダメージ
 * @param isSkill スキルであるか
 * @param physicalDamage 物理ダメージ
 * @param magicDamage 魔法ダメージ
 */
export type Damage = {
  isSkill: boolean;
  physicalDamage: number;
  magicDamage: number;
};
