import { VStack } from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";
import { Map } from "./Map";
import { BattleView } from "./BattleView";

export const BattleSection: React.FC = () => {
  const { battleState } = useBattleManager();
  return (
    <VStack w="600px">
      {battleState === "closed" ? <Map /> : <BattleView />}
    </VStack>
  );
};
