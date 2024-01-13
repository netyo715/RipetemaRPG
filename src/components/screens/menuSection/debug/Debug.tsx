import React from "react";
import {
  useItemData,
  useUpdateUserData,
} from "../../../../contexts/UserDataProvider";
import { ItemId } from "../../../../data/item";
import { Button } from "@yamada-ui/react";

export const Debug: React.FC = () => {
  const { saveGameData } = useUpdateUserData();
  return (
    <>
      <Button onClick={saveGameData}>保存</Button>
    </>
  );
};
