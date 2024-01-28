import {
  CloseButton,
  HStack,
  ScrollArea,
  Spacer,
  VStack,
} from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";

export const BattleView: React.FC = () => {
  const { startBattle, closeBattle, battleLog } = useBattleManager();
  return (
    <VStack h="full">
      <HStack>
        <Spacer />
        <CloseButton onClick={closeBattle} />
      </HStack>
      <ScrollArea
        p="md"
        type="always"
        innerProps={{ as: VStack, minH: 0, gap: 0 }}
      >
        {battleLog.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </ScrollArea>
    </VStack>
  );
};
