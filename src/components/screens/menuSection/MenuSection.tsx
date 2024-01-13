import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@yamada-ui/react";
import { Debug } from "./debug/Debug";

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
          <Tab>デバッグ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>a</p>
          </TabPanel>
          <TabPanel>
            <p>b</p>
          </TabPanel>
          <TabPanel>
            <p>c</p>
          </TabPanel>
          <TabPanel>
            <p>d</p>
          </TabPanel>
          <TabPanel>
            <Debug />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
