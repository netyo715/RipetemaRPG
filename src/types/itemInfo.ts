import { ItemId } from "../data/define/item";

/**
 * アイテム情報
 */
export type ItemInfo = Partial<Record<ItemId, number>>;