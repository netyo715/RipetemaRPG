import { GAME_VERSION } from "../data/game";
import { AdventurerData, GameData, GearData, ItemData } from "../types/game";

export const userData2SaveData = (
  adventurerData: AdventurerData,
  itemData: ItemData,
  gearData: GearData,
  gameData: GameData
): string => {
  const jsonUserData = JSON.stringify({
    version: GAME_VERSION,
    adventurerData: adventurerData,
    itemData: itemData,
    gearData: gearData,
    gameData: gameData,
  });
  return jsonUserData;
};

export const saveData2UserData = (
  saveData: string
): {
  adventurerData: AdventurerData;
  itemData: ItemData;
  gearData: GearData;
  gameData: GameData;
} => {
  const jsonUserData: {
    version: string;
    adventurerData: AdventurerData;
    itemData: ItemData;
    gearData: GearData;
    gameData: GameData;
  } = JSON.parse(saveData);
  return jsonUserData;
};
