import { GearId } from "../data/gear";
import { ItemId } from "../data/item";
import { Adventurer } from "./adventurer";

export type gameData = {
  adventurers: Adventurer[];
  items: { itemId: ItemId; amount: number }[];
  gears: (
    | { gearId: GearId; isEquipped: true; equippingAdventurerIndex: number }
    | { gearId: GearId; isEquipped: false }
  )[];
  gold: number;
};
