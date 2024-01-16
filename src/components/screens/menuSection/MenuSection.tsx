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
          <TabPanel h="full">
            <AdventurerInfo />
          </TabPanel>
          <TabPanel h="full">
            <p>b</p>
          </TabPanel>
          <TabPanel h="full">
            <p>c</p>
          </TabPanel>
          <TabPanel h="full">
            <Settings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
