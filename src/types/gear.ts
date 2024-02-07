import { Status } from "./battle";

/**
 * 装備する部位
 */
export type GearType =
  | "weapon"
  | "shield"
  | "head"
  | "body"
  | "arm"
  | "leg"
  | "other";

/**
 * 部位名
 */
export const GEAR_TYPE_NAME: {[key in GearType]: string} = {
  weapon: "武器",
  shield: "盾",
  head: "頭",
  body: "体",
  arm: "腕",
  leg: "脚",
  other: "その他"
}

/**
 * 装備
 */
export type Gear = {
  name: string;
  gearType: GearType;
  status: Partial<Status>;
};