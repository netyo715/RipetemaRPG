import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { AdventurerData, GameData, GearData, ItemData } from "../types/game";
import { AUTO_SAVE_INTERVAL } from "../data/game";

type UpdateUserDataContextProps = {
  saveGameData: () => void;
};

const adventurerDataContext = createContext<AdventurerData | undefined>(
  undefined
);
const gearDataContext = createContext<GearData | undefined>(undefined);
const itemDataContext = createContext<ItemData | undefined>(undefined);
const gameDataContext = createContext<GameData | undefined>(undefined);

const updateUserDataContext = createContext<
  UpdateUserDataContextProps | undefined
>(undefined);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adventurers, updateAdventurers] = useImmer<AdventurerData>([]);
  const [gearData, updateGears] = useImmer<GearData>([]);
  const [itemData, updateItemData] = useImmer<ItemData>({});
  const [gameData, updateGameData] = useImmer<GameData>({ gold: 0 });

  const saveWaitingTimeRef = useRef<number>(AUTO_SAVE_INTERVAL);

  useEffect(() => {
    // オートセーブの間隔を管理するタイマー
    const timer = setInterval(() => {
      saveWaitingTimeRef.current -= 1000;
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // オートセーブの予約
  useEffect(() => {
    const timer = setTimeout(() => {
      saveGameData();
      saveWaitingTimeRef.current = AUTO_SAVE_INTERVAL;
    }, saveWaitingTimeRef.current);
    return () => {
      clearTimeout(timer);
    };
  });

  const saveGameData: () => void = () => {
    console.log("saved", itemData); // TODO
  };

  const contextValue: UpdateUserDataContextProps = {
    saveGameData: saveGameData,
  };

  return (
    <adventurerDataContext.Provider value={adventurers}>
      <gearDataContext.Provider value={gearData}>
        <itemDataContext.Provider value={itemData}>
          <gameDataContext.Provider value={gameData}>
            <updateUserDataContext.Provider value={contextValue}>
              {children}
            </updateUserDataContext.Provider>
          </gameDataContext.Provider>
        </itemDataContext.Provider>
      </gearDataContext.Provider>
    </adventurerDataContext.Provider>
  );
};

export const useAdventurerData = (): AdventurerData => {
  const context = useContext(adventurerDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useGearData = (): GearData => {
  const context = useContext(gearDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useItemData = (): ItemData => {
  const context = useContext(itemDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useGameData = (): GameData => {
  const context = useContext(gameDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useUpdateUserData = (): UpdateUserDataContextProps => {
  const context = useContext(updateUserDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
