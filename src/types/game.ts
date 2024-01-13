import { GearId } from "../data/gear";
import { ItemId } from "../data/item";
import { Adventurer } from "./adventurer";

export type AdventurerData = Adventurer[];

export type GearData = (
  | { gearId: GearId; isEquipped: true; equippingAdventurerIndex: number }
  | { gearId: GearId; isEquipped: false }
)[];

export type ItemData = {
  [key in ItemId]?: number;
};

export type GameData = {
  gold: number;
};
