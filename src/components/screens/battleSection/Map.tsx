import { Button, Heading, VStack } from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";
import { DUNGEONS } from "../../../data/dungeon";

export const Map: React.FC = () => {
  const { startBattle, closeBattle, battleLog } = useBattleManager();
  return (
    <VStack h="full" w="full">
      {DUNGEONS.map((dungeon) => {
        return (
          <VStack>
            <Heading>{dungeon.name}</Heading>
            <VStack>
              {dungeon.areas.map((area) => {
                return (
                  <Button onClick={() => startBattle(area)}>{area.name}</Button>
                );
              })}
            </VStack>
          </VStack>
        );
      })}
    </VStack>
  );
};
