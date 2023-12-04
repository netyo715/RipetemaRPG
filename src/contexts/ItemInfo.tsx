import { useImmerReducer } from "use-immer";
import { Dispatch, ReactNode, createContext } from "react";
import { ItemId } from "../data/define/item";
import { ItemInfo } from "../types/itemInfo";

export const ItemInfoContext = createContext<ItemInfo | null>(null);
export const ItemInfoDispatchContext = createContext<Dispatch<itemInfoAction> | null>(null);

export function ItemInfoProvider({children}: {children: ReactNode}) {
	const [itemInfo, dispatch] = useImmerReducer(itemInfoReducer, initialItemInfo);
	return(
		<ItemInfoContext.Provider value={itemInfo}>
			<ItemInfoDispatchContext.Provider value={dispatch}>
				{children}
			</ItemInfoDispatchContext.Provider>
		</ItemInfoContext.Provider>
	)
}

type itemInfoAction = 
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

function itemInfoReducer(itemInfo: ItemInfo, action: itemInfoAction){
	switch (action.type){
		case "addItem": {
			if(!itemInfo.hasOwnProperty(action.itemId)){
				itemInfo[action.itemId] = 0;
			}
			itemInfo[action.itemId]! += action.amount;
			break;
		}
		case "reduceItem": {
			if(!itemInfo.hasOwnProperty(action.itemId)){
				itemInfo[action.itemId] = 0;
			}
			itemInfo[action.itemId]! -= action.amount;
		}
	}
}

const initialItemInfo: ItemInfo = {};