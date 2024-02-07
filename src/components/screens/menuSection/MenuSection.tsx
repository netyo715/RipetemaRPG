import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@yamada-ui/react";
import { Settings } from "./settings/Settings";
import { AdventurerInfo } from "./adventurerInfo/AdventurerInfo";
import { ItemInfo } from "./itemInfo/ItemInfo";
import { GearInfo } from "./gearInfo/GearInfo";

// TODO
export const MenuSection: React.FC = () => {
  return (
    <VStack>
      <Tabs h="full" orientation="vertical">
        <TabList>
          <Tab>冒険者</Tab>
          <Tab>装備</Tab>
          <Tab>アイテム</Tab>
          <Tab>設定</Tab>
        </TabList>
        <TabPanels>
          <TabPanel h="full" p="0">
            <AdventurerInfo />
          </TabPanel>
          <TabPanel h="full" p="0">
            <GearInfo />
          </TabPanel>
          <TabPanel h="full" p="0">
            <ItemInfo />
          </TabPanel>
          <TabPanel h="full" p="0">
            <Settings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
