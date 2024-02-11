/**
 * アイテムID
 */
export enum ItemId {
  獣の皮 = "I000",
  木の板 = "I001",
  獣の骨 = "I002",
}

/**
 * アイテム名
 */
export const ITEM_NAME: ItemName = {
  [ItemId.獣の皮]: "獣の皮",
  [ItemId.木の板]: "木の板",
  [ItemId.獣の骨]: "獣の骨",
};

type ItemName = { [itemId in ItemId]: string };
