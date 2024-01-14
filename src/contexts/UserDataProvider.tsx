import { ReactNode, createContext, useContext } from "react";
import { Updater, useImmer } from "use-immer";
import { AdventurerData, GameData, GearData, ItemData } from "../types/game";
import { INITIAL_ADVENTURER_DATA } from "../data/game";

const adventurerDataContext = createContext<AdventurerData | undefined>(
  undefined
);
const gearDataContext = createContext<GearData | undefined>(undefined);
const itemDataContext = createContext<ItemData | undefined>(undefined);
const gameDataContext = createContext<GameData | undefined>(undefined);

const updateAdventurerDataContext = createContext<
  Updater<AdventurerData> | undefined
>(undefined);
const updateGearDataContext = createContext<Updater<GearData> | undefined>(
  undefined
);
const updateItemDataContext = createContext<Updater<ItemData> | undefined>(
  undefined
);
const updateGameDataContext = createContext<Updater<GameData> | undefined>(
  undefined
);

/**
 * ユーザーのデータを保持するProviderをまとめたもの
 */
export const UserDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adventurerData, updateAdventurerData] = useImmer<AdventurerData>(
    INITIAL_ADVENTURER_DATA
  );
  const [gearData, updateGearData] = useImmer<GearData>([]);
  const [itemData, updateItemData] = useImmer<ItemData>({});
  const [gameData, updateGameData] = useImmer<GameData>({ gold: 0 });

  return (
    <adventurerDataContext.Provider value={adventurerData}>
      <gearDataContext.Provider value={gearData}>
        <itemDataContext.Provider value={itemData}>
          <gameDataContext.Provider value={gameData}>
            <updateAdventurerDataContext.Provider value={updateAdventurerData}>
              <updateGearDataContext.Provider value={updateGearData}>
                <updateItemDataContext.Provider value={updateItemData}>
                  <updateGameDataContext.Provider value={updateGameData}>
                    {children}
                  </updateGameDataContext.Provider>
                </updateItemDataContext.Provider>
              </updateGearDataContext.Provider>
            </updateAdventurerDataContext.Provider>
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

export const useUpdateAdventurerData = (): Updater<AdventurerData> => {
  const context = useContext(updateAdventurerDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useUpdateGearData = (): Updater<GearData> => {
  const context = useContext(updateGearDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useUpdateItemData = (): Updater<ItemData> => {
  const context = useContext(updateItemDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const useUpdateGameData = (): Updater<GameData> => {
  const context = useContext(updateGameDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
