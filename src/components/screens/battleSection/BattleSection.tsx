import { Button, VStack } from "@yamada-ui/react";
import { useBattleManager } from "../../../contexts/BattleManagerProvider";
import { DUNGEONS } from "../../../data/dungeon";

export const BattleSection: React.FC = () => {
  const { startBattle, closeBattle, battleLog } = useBattleManager();
  return (
    <VStack w="600px">
      <Button onClick={() => startBattle(DUNGEONS[0].areas[0])}>open</Button>
      <Button onClick={closeBattle}>close</Button>
      {battleLog.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      ここにバトルの情報が表示されます
    </VStack>
  );
};
