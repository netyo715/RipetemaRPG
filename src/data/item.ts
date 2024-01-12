/**
 * アイテムID
 */
export enum ItemId {
  獣の皮 = "I000",
  木の板 = "I001",
}

/**
 * アイテム名
 */
export const ITEM_NAME: ItemName = {
  [ItemId.獣の皮]: "獣の皮",
  [ItemId.木の板]: "木の板",
};

type ItemName = { [itemId in ItemId]: string };
