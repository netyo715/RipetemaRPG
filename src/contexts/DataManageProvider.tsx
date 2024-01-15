import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { AUTO_SAVE_INTERVAL } from "../data/game";
import { ItemId } from "../data/item";
import {
  useAdventurerData,
  useGameData,
  useGearData,
  useItemData,
  useUpdateAdventurerData,
  useUpdateGameData,
  useUpdateItemData,
} from "./UserDataProvider";
import { AdventurerData, GameData, GearData, ItemData } from "../types/game";

type UpdateUserDataContextProps = {
  saveUserData: () => void;
  loadUserData: (
    adventurerData: AdventurerData,
    gearData: GearData,
    itemData: ItemData,
    gameData: GameData
  ) => void;
  changeItemAmount: (itemId: ItemId, amount: number) => void;
};

const updateUserDataContext = createContext<
  UpdateUserDataContextProps | undefined
>(undefined);

/**
 * 各コンポーネントからデータを管理するためのコンポーネント
 */
export const DataManageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const adventurerData = useAdventurerData();
  const gearData = useGearData();
  const itemData = useItemData();
  const gameData = useGameData();

  const updateAdventurerData = useUpdateAdventurerData();
  const updateGearData = useUpdateGameData();
  const updateItemData = useUpdateItemData();
  const updateGameData = useUpdateGameData();

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
      saveUserData();
      saveWaitingTimeRef.current = AUTO_SAVE_INTERVAL;
    }, saveWaitingTimeRef.current);
    return () => {
      clearTimeout(timer);
    };
  });

  // 以下、useUpdateUserDataで呼ぶ関数
  const saveUserData = (): void => {
    console.log("saved"); // TODO 実装する
  };

  const loadUserData = (
    adventurerData: AdventurerData,
    gearData: GearData,
    itemData: ItemData,
    gameData: GameData
  ): void => {
    updateAdventurerData((draft) => adventurerData);
    updateGearData((draft) => gearData);
    updateItemData((draft) => itemData);
    updateGameData((draft) => gameData);
    console.log("loaded");
  };

  const changeItemAmount = (itemId: ItemId, amount: number): void => {
    updateItemData((draft) => {
      draft[itemId] = amount;
    });
  };

  const contextValue: UpdateUserDataContextProps = {
    saveUserData: saveUserData,
    loadUserData: loadUserData,
    changeItemAmount: changeItemAmount,
  };

  return (
    <updateUserDataContext.Provider value={contextValue}>
      {children}
    </updateUserDataContext.Provider>
  );
};

export const useUpdateUserData = (): UpdateUserDataContextProps => {
  const context = useContext(updateUserDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
