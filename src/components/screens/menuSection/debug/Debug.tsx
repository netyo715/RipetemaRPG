import React from "react";
import {
  useAdventurerData,
  useItemData,
} from "../../../../contexts/UserDataProvider";
import { ItemId } from "../../../../data/item";
import { Button } from "@yamada-ui/react";
import { useUpdateUserData } from "../../../../contexts/DataManageProvider";

export const Debug: React.FC = () => {
  console.log("render debug");
  const { saveGameData } = useUpdateUserData();
  return (
    <>
      <Button onClick={saveGameData}>保存</Button>
      <Item />
      <ItemUpdate />
      <Adventurer />
    </>
  );
};

const Item: React.FC = () => {
  console.log("render Item");
  const itemData = useItemData();
  return <p>{itemData[ItemId.木の板]}</p>;
};

const ItemUpdate: React.FC = () => {
  console.log("render ItemUpdate");
  const { changeItemAmount } = useUpdateUserData();
  return (
    <Button
      onClick={() =>
        changeItemAmount(ItemId.木の板, Math.floor(Math.random() * 5))
      }
    >
      更新
    </Button>
  );
};

const Adventurer: React.FC = () => {
  console.log("render Adventurer");
  const adventurerData = useAdventurerData();
  return <p>{adventurerData.toString()}</p>;
};
