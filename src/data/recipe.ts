import { Recipe } from "../types/recipe";
import { GearId } from "./gear";
import { ItemId } from "./item";

export const RECIPES: Recipe[] = [
  {
    // TODO 仮
    product: GearId.木刀,
    amount: 1,
    material: [{ itemId: ItemId.木の板, amount: 10 }],
    price: 100,
  },
];
