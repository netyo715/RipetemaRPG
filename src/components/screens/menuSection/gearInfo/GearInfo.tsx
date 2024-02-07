import { Container, ScrollArea, VStack } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { useMemo } from "react";
import {
  useAdventurerData,
  useGearData,
} from "../../../../contexts/UserDataProvider";
import { GEAR_INFO } from "../../../../data/gear";
import { GEAR_TYPE_NAME } from "../../../../types/gear";

export const GearInfo: React.FC = () => {
  const adventurerData = useAdventurerData();
  const gearData = useGearData();
  const columns = useMemo<Column<any>[]>(
    () => [
      {
        header: "装備名",
        accessorKey: "name",
      },
      { header: "部位", accessorKey: "gearType" },
      { header: "装備者", accessorKey: "adventurerName" },
    ],
    []
  );
  const data = useMemo<any[]>(
    () =>
      gearData.map((data) => {
        const info = GEAR_INFO[data.gearId];
        return {
          name: info.name,
          gearType: GEAR_TYPE_NAME[info.gearType],
          adventurerName: data.isEquipped
            ? adventurerData[data.equippingAdventurerIndex].name
            : "なし",
        };
      }),
    [gearData]
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
