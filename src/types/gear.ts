import { GearId } from "../data/define/gear";
import { SkillId } from "../data/define/skill";
import { Status } from "./status";

/**
 * 装備
 */
export type Gear = {
  id: GearId,
  name: string,
  type: GearType,
  status: Status,
  skill: SkillId[],
};

/**
 * 装備と装備状況
 */
export type GearInfos = {gearId: GearId, equippedCharacterIndex: number|null}[];

/**
 * 装備部位
 */
export enum GearType{
  Weapon,
  Shield,
  Head,
  Body,
  Hand,
  Leg,
  Accessory,
}