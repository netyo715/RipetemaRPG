import { Button, VStack } from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";

export const BattleView: React.FC = () => {
  const { startBattle, closeBattle, battleLog } = useBattleManager();
  return (
    <VStack h="full" w="full">
      <Button minH="100px" onClick={closeBattle}>
        close
      </Button>
      <VStack>
        {battleLog.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </VStack>
    </VStack>
  );
};
