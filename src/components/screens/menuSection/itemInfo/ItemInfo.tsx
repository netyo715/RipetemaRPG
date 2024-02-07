import { Container, ScrollArea, VStack } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { useMemo } from "react";
import { useItemData } from "../../../../contexts/UserDataProvider";
import { ItemData } from "../../../../types/game";
import { ITEM_NAME } from "../../../../data/item";

export const ItemInfo: React.FC = () => {
  const itemData = useItemData();
  const columns = useMemo<Column<any>[]>(
    () => [
      {
        header: "アイテム名",
        accessorKey: "name",
      },
      { header: "個数", accessorKey: "amount" },
    ],
    []
  );
  const data = useMemo<any[]>(
    () =>
      (Object.keys(itemData) as (keyof ItemData)[]).map((itemId) => {
        return { name: ITEM_NAME[itemId], amount: itemData[itemId]! };
      }),
    [itemData]
  );
  return (
    <Container h="full" p="0">
      <ScrollArea type="always" p="md" innerProps={{ as: VStack, minH: 0 }}>
        <Table
          overflowX="auto"
          columns={columns}
          data={data}
          enableRowSelection={false}
        />
      </ScrollArea>
    </Container>
  );
};
