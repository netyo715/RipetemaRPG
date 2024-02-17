import { Recipe } from "../types/recipe";
import { GearId } from "./gear";
import { ItemId } from "./item";

export const RECIPES: Recipe[] = [
  {
    product: GearId.骨の剣,
    amount: 1,
    material: [
      { itemId: ItemId.獣の皮, amount: 3 },
      { itemId: ItemId.獣の骨, amount: 5 },
    ],
    price: 100,
  },
];
