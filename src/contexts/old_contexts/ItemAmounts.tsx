import { useImmerReducer } from "use-immer";
import { Dispatch, ReactNode, createContext } from "react";
import { ItemId } from "../../data/define/item";
import { ItemAmounts } from "../../types/item";

export const ItemAmountsContext = createContext<ItemAmounts | null>(null);
export const ItemAmountsDispatchContext = createContext<Dispatch<itemAmountsAction> | null>(null);

export function ItemAmountsProvider({children}: {children: ReactNode}) {
	const [itemAmounts, dispatch] = useImmerReducer(itemAmountsReducer, initialItemAmounts);
	return(
		<ItemAmountsContext.Provider value={itemAmounts}>
			<ItemAmountsDispatchContext.Provider value={dispatch}>
				{children}
			</ItemAmountsDispatchContext.Provider>
		</ItemAmountsContext.Provider>
	)
}

type itemAmountsAction = 
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

function itemAmountsReducer(itemAmounts: ItemAmounts, action: itemAmountsAction){
	switch (action.type){
		case "addItem": {
			if(!itemAmounts.hasOwnProperty(action.itemId)){
				itemAmounts[action.itemId] = 0;
			}
			itemAmounts[action.itemId]! += action.amount;
			break;
		}
		case "reduceItem": {
			if(!itemAmounts.hasOwnProperty(action.itemId)){
				itemAmounts[action.itemId] = 0;
			}
			itemAmounts[action.itemId]! -= action.amount;
		}
	}
}

const initialItemAmounts: ItemAmounts = {};