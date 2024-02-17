/**
 * アイテムID
 */
export enum ItemId {
  獣の皮 = "I000",
  獣の骨 = "I001",
}

/**
 * アイテム名
 */
export const ITEM_NAME: ItemName = {
  [ItemId.獣の皮]: "獣の皮",
  [ItemId.獣の骨]: "獣の骨",
};

type ItemName = { [itemId in ItemId]: string };
