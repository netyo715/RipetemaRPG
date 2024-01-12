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
 * 装備
 */
export type Gear = {
  name: string;
  gearType: GearType;
  status: Partial<Status>;
};