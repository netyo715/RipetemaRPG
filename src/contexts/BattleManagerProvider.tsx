import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import {
  useAdventurerData,
  useUpdateAdventurerData,
  useUpdateGameData,
  useUpdateItemData,
} from "./UserDataProvider";
import { BattleManager } from "../scripts/battleManager";
import { Area } from "../types/dungeon";

//TODO
type BattleManagerContextProps = {
  startBattle: (area: Area) => void;
  closeBattle: () => void;
  battleLog: string[];
};

const battleManagerContext = createContext<
  BattleManagerContextProps | undefined
>(undefined);

export const BattleManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const adventurerData = useAdventurerData();
  const updateAdventurerData = useUpdateAdventurerData();
  const updateGearData = useUpdateAdventurerData();
  const updateItemData = useUpdateItemData();
  const updateGameData = useUpdateGameData();

  const battleManagerRef = useRef<BattleManager>();
  const [battleLog, updateBattleLog] = useImmer<string[]>([]);

  useEffect(() => {
    if (battleManagerRef.current) {
      battleManagerRef.current.adventurerData = adventurerData;
    }
  }, [adventurerData]);

  // TODO
  const startBattle = (area: Area): void => {
    if (battleManagerRef.current) {
      return;
    }
    battleManagerRef.current = new BattleManager(
      adventurerData,
      sendLog,
      updateAdventurerData
    );
    battleManagerRef.current.run(area);
  };

  const closeBattle = (): void => {
    if (battleManagerRef.current) {
      battleManagerRef.current.close();
      battleManagerRef.current = undefined;
      updateBattleLog((draft) => []);
    }
  };

  const sendLog = (text: string): void => {
    updateBattleLog((draft) => {
      draft.push(text);
      return;
    });
  };

  const providerValue: BattleManagerContextProps = {
    startBattle: startBattle,
    closeBattle: closeBattle,
    battleLog: battleLog,
  };
  return (
    <battleManagerContext.Provider value={providerValue}>
      {children}
    </battleManagerContext.Provider>
  );
};

export const useBattleManager = (): BattleManagerContextProps => {
  const context = useContext(battleManagerContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
