import {
  CloseButton,
  HStack,
  Heading,
  ScrollArea,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";

export const BattleView: React.FC = () => {
  const { closeBattle, battleLog, battleInfo } = useBattleManager();
  return (
    <VStack h="full" p="0" gap="0">
      <HStack p="md">
        <Heading>{battleInfo?.area.name}</Heading>
        <Spacer />
        <CloseButton onClick={closeBattle} />
      </HStack>
      <VStack p="md">
        {battleInfo?.adventurerUnitForViews.map((unit, index) => {
          return (
            <Text key={"a" + index}>
              {unit.name}: {unit.currentHp}/{unit.hp}
            </Text>
          );
        })}
        {battleInfo?.monsterUnitForViews.map((unit, index) => {
          return (
            <Text key={"m" + index}>
              {unit.name}: {unit.currentHp}/{unit.hp}
            </Text>
          );
        })}
      </VStack>
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
