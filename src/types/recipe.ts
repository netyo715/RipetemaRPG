import { GearId } from "../data/gear";
import { ItemId } from "../data/item";

export type Recipe = {
  product: ItemId | GearId;
  amount: number;
  material: { itemId: ItemId; amount: number }[];
  price: number;
};
