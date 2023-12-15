import { useImmerReducer } from "use-immer";
import { Dispatch, ReactNode, createContext } from "react";
import { ItemId } from "../data/define/item";
import { ItemAmounts } from "../types/item";
import { JobId } from "../data/define/job";
import { GearId } from "../data/define/gear";
import { GearInfos, GearType } from "../types/gear";
import { Character, changeJob, equipmentGear, gainExp, getDefaultCharacter, unequipmentGear } from "../types/character";
import { GameInfo, getDefaultGameInfo } from "../types/gameInfo";

export const MasterDataContext = createContext<MasterData | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function MasterDataProvider({children}: {children: ReactNode}) {
	const [masterData, dispatch] = useImmerReducer(reducer, initialMasterData);
  return(
		<MasterDataContext.Provider value={masterData}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</MasterDataContext.Provider>
	)
}

type Action = 
// ゲーム情報
|{
	type: "addGold";
	gold: number;
}

// キャラクター
|{
	type: "changeJob";
	index: number;
	jobId: JobId;
}
|{
	type: "gainExpAll";
	exp: number;
}

// アイテム
|{
	type: "addItem";
	itemId: ItemId;
	amount: number;
}
|{
	type: "reduceItem";
	itemId: ItemId;
	amount: number;
}

// 装備
|{
	type: "addGear";
	gearId: GearId;
}
|{
	type: "deleteGearNotEquipped";
	index: number;
}
|{
	type: "equipmentGear";
	gearIndex: number;
	characterIndex: number;
}
|{
	type: "unequipmentGear";
	gearType: GearType;
	characterIndex: number;
}

function reducer(data: MasterData, action: Action){
	switch (action.type){
    // ゲーム情報
    case "addGold": {
      data.gameInfo.gold += action.gold;
      break;
    }

    // キャラクター
    case "changeJob": {
      changeJob(data.characters[action.index], action.jobId);
      break;
    }
    case "gainExpAll": {
      data.characters.forEach((character) => {
				gainExp(character, action.exp);
			});
			break;
    }

    // アイテム
		case "addItem": {
			if(!data.itemAmounts.hasOwnProperty(action.itemId)){
				data.itemAmounts[action.itemId] = 0;
			}
			data.itemAmounts[action.itemId]! += action.amount;
			break;
		}
		case "reduceItem": {
			data.itemAmounts[action.itemId]! -= action.amount;
      break;
		}

    // 装備
    case "addGear": {
			data.gearInfos.push({gearId: action.gearId, equippedCharacterIndex: null});
			break;
		}
		case "deleteGearNotEquipped": {
			if (data.gearInfos[action.index].equippedCharacterIndex === null){
				data.gearInfos.splice(action.index, 1);
			}
			break;
		}
		case "equipmentGear": {
      equipmentGear(data.characters[action.characterIndex], data.gearInfos, action.gearIndex);
      break
		}
		case "unequipmentGear": {
			unequipmentGear(data.characters[action.characterIndex], data.gearInfos, action.gearType);
			break
		}
	}
}

const initialMasterData: MasterData = {
  gameInfo: getDefaultGameInfo(),
  characters: [getDefaultCharacter(0)],
  itemAmounts: {},
  // TODO 本当はこっち gearInfos: [],
	gearInfos: [
		{gearId: GearId.TestGear1, equippedCharacterIndex: null},
		{gearId: GearId.TestGear2, equippedCharacterIndex: null},
		{gearId: GearId.TestGear3, equippedCharacterIndex: null},
		{gearId: GearId.TestGear4, equippedCharacterIndex: null},
		{gearId: GearId.TestGear5, equippedCharacterIndex: null},
		{gearId: GearId.TestGear6, equippedCharacterIndex: null},
		{gearId: GearId.TestGear7, equippedCharacterIndex: null},
	],
};

type MasterData = {
  gameInfo: GameInfo,
  characters: Character[],
  itemAmounts: ItemAmounts,
  gearInfos: GearInfos,
}