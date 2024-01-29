import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Button,
  Heading,
  VStack,
} from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";
import { DUNGEONS } from "../../../data/dungeon";

export const Map: React.FC = () => {
  const { startBattle, closeBattle, battleLog } = useBattleManager();
  return (
    <VStack>
      <Accordion isMultiple>
        {DUNGEONS.map((dungeon) => {
          return (
            <AccordionItem key={dungeon.name} label={dungeon.name}>
              <AccordionPanel p="sm">
                <VStack gap="sm">
                  {dungeon.areas.map((area) => {
                    return (
                      <Button
                        key={area.name}
                        variant="ghost"
                        justifyContent="start"
                        onClick={() => startBattle(area)}
                      >
                        {area.name}
                      </Button>
                    );
                  })}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </VStack>
  );
};
