import { ItemId } from "../data/define/item";

/**
 * アイテム所持数
 */
export type ItemAmounts = Partial<Record<ItemId, number>>;