import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import {
  AUTO_SAVE_INTERVAL,
  INITIAL_ADVENTURER_DATA,
  LOCAL_STORAGE_USER_DATA_KEY,
} from "../data/game";
import { ItemId } from "../data/item";
import {
  useAdventurerData,
  useGameData,
  useGearData,
  useItemData,
  useUpdateAdventurerData,
  useUpdateGameData,
  useUpdateGearData,
  useUpdateItemData,
} from "./UserDataProvider";
import { AdventurerData, GameData, GearData, ItemData } from "../types/game";
import { getRequiredExperience } from "../data/adventurer";
import { getJobRequiredExperience } from "../data/job";
import { saveData2UserData, userData2SaveData } from "../scripts/game";

type UpdateUserDataContextProps = {
  saveUserData: () => void;
  loadUserData: (
    adventurerData: AdventurerData,
    gearData: GearData,
    itemData: ItemData,
    gameData: GameData
  ) => void;
  resetUserData: () => void;
  addAdventurerExperience: (index: number, experience: number) => void;
  changeItemAmount: (itemId: ItemId, diff: number) => void;
  changeGoldAmount: (diff: number) => void;
};

const updateUserDataContext = createContext<
  UpdateUserDataContextProps | undefined
>(undefined);

/**
 * 各コンポーネントからデータを管理するためのコンポーネント
 */
export const DataManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const adventurerData = useAdventurerData();
  const gearData = useGearData();
  const itemData = useItemData();
  const gameData = useGameData();

  const updateAdventurerData = useUpdateAdventurerData();
  const updateGearData = useUpdateGearData();
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

  /**
   * ゲームデータロード
   */
  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
    if (localData) {
      const userData = saveData2UserData(localData);
      loadUserData(
        userData.adventurerData,
        userData.gearData,
        userData.itemData,
        userData.gameData
      );
    }
  }, []);

  // 以下、useUpdateUserDataで呼ぶ関数
  const saveUserData = (): void => {
    localStorage.setItem(
      LOCAL_STORAGE_USER_DATA_KEY,
      userData2SaveData(adventurerData, itemData, gearData, gameData)
    );
    console.log("userdata saved");
  };

  const loadUserData = (
    adventurerData: AdventurerData,
    gearData: GearData,
    itemData: ItemData,
    gameData: GameData
  ): void => {
    updateAdventurerData(adventurerData);
    updateGearData(gearData);
    updateItemData(itemData);
    updateGameData(gameData);
    console.log("userdata loaded");
  };

  const resetUserData = (): void => {
    updateAdventurerData(INITIAL_ADVENTURER_DATA);
    updateGearData([]);
    updateItemData({});
    updateGameData({ gold: 0 }); // TODO 初期値を別で定義
  };

  const changeItemAmount = (itemId: ItemId, diff: number): void => {
    updateItemData((draft) => {
      if (itemId in draft) {
        draft[itemId]! += diff;
      } else {
        draft[itemId] = diff;
      }
    });
  };

  const changeGoldAmount = (diff: number): void => {
    updateGameData((draft) => {
      draft.gold += diff;
    });
  };

  const addAdventurerExperience = (index: number, experience: number): void => {
    updateAdventurerData((draft) => {
      const adventurer = draft[index];
      // 冒険者レベル
      adventurer.experience += experience;
      let requiredExperience = getRequiredExperience(adventurer.level);
      while (adventurer.experience >= requiredExperience) {
        adventurer.experience -= requiredExperience;
        adventurer.level++;
        requiredExperience = getRequiredExperience(adventurer.level);
      }
      // 職業レベル
      const job = adventurer.jobInfo[adventurer.currentJobId]!;
      job.experience += experience;
      let requiredJobExperience = getJobRequiredExperience(
        adventurer.currentJobId,
        job.level
      );
      while (job.experience >= requiredJobExperience) {
        job.experience -= requiredJobExperience;
        job.level++;
        requiredJobExperience = getJobRequiredExperience(
          adventurer.currentJobId,
          job.level
        );
      }
    });
  };

  const contextValue: UpdateUserDataContextProps = {
    saveUserData: saveUserData,
    loadUserData: loadUserData,
    resetUserData: resetUserData,
    addAdventurerExperience: addAdventurerExperience,
    changeItemAmount: changeItemAmount,
    changeGoldAmount: changeGoldAmount,
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
