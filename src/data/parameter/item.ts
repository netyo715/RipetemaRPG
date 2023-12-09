import { ItemId } from "../define/item";

type ItemName = {
  [key in ItemId]: string
}

export const ITEM_NAME: ItemName = {
  [ItemId.TestItem1]: "テストアイテム1",
}