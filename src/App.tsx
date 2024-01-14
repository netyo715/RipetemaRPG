import { Divider, Flex, UIProvider } from "@yamada-ui/react";
import { Header } from "./components/screens/header/Header";
import { BattleSection } from "./components/screens/battleSection/BattleSection";
import { MenuSection } from "./components/screens/menuSection/MenuSection";
import { RepetemaRPGProvider } from "./contexts/RepetemaRPGProvider";

function App() {
  return (
    <UIProvider>
      <RepetemaRPGProvider>
        <Header />
        <Flex h="calc(100vh - 48px)" gap="0">
          <MenuSection />
          <Divider orientation="vertical" variant="solid" />
          <BattleSection />
        </Flex>
      </RepetemaRPGProvider>
    </UIProvider>
  );
}

export default App;
