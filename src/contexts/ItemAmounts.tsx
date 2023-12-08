import { ReactNode, createContext, useContext } from "react";
import { ItemAmounts } from "../types/item";
import { MasterDataContext } from "./Master";

export const ItemAmountsContext = createContext<ItemAmounts | null>(null);

export function ItemAmountsProvider({children}: {children: ReactNode}) {
	const itemAmounts = useContext(MasterDataContext)!.itemAmounts;
	return(
		<ItemAmountsContext.Provider value={itemAmounts}>
			{children}
		</ItemAmountsContext.Provider>
	)
}
