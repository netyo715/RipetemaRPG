import { Divider, Flex, UIProvider } from "@yamada-ui/react";
import { Header } from "./components/screens/header/Header";
import { BattleSection } from "./components/screens/battleSection/BattleSection";
import { MenuSection } from "./components/screens/menuSection/MenuSection";
import { RepetemaRPGProvider } from "./contexts/RepetemaRPGProvider";
import { UserDataProvider } from "./contexts/UserDataProvider";

function App() {
  return (
    <UIProvider>
      <UserDataProvider>
        <Header />
        <Flex h="calc(100vh - 48px)" gap="0">
          <MenuSection />
          <Divider orientation="vertical" variant="solid" />
          <BattleSection />
        </Flex>
      </UserDataProvider>
    </UIProvider>
  );
}

export default App;
