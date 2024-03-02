import { GearId } from "../data/gear";
import { ItemId } from "../data/item";

export type Recipe = {
  product: GearId;
  amount: number;
  materials: { itemId: ItemId; amount: number }[];
  price: number;
};
