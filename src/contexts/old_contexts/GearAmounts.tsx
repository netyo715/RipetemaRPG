import { useImmerReducer } from "use-immer";
import { Dispatch, ReactNode, createContext } from "react";
import { GearId } from "../../data/define/gear";
import { GearInfos } from "../../types/gear";
import { CharactersAction } from "./Characters";

export const GearAmountsContext = createContext<GearInfos | null>(null);
export const GearAmountsDispatchContext = createContext<Dispatch<gearAmountsAction> | null>(null);

export function GearAmountsProvider({children}: {children: ReactNode}) {
	const [gearAmounts, dispatch] = useImmerReducer(gearAmountsReducer, initialGearAmounts);
	return(
		<GearAmountsContext.Provider value={gearAmounts}>
			<GearAmountsDispatchContext.Provider value={dispatch}>
				{children}
			</GearAmountsDispatchContext.Provider>
		</GearAmountsContext.Provider>
	)
}

type gearAmountsAction = 
|{
	type: "addGear";
	gearId: GearId;
}
|{
	type: "deleteGearNotEquipped";
	index: number;
}
|{
	type: "equpmentGear";
	gearIndex: number;
	characterDispatcher: Dispatch<CharactersAction>;
	characterIndex: number;
}

function gearAmountsReducer(gearAmounts: GearInfos, action: gearAmountsAction){
	switch (action.type){
		case "addGear": {
			gearAmounts.push({gearId: action.gearId, equippedCharacterIndex: null});
			break;
		}
		case "deleteGearNotEquipped": {
			if (gearAmounts[action.index].equippedCharacterIndex === null){
				gearAmounts.splice(action.index, 1);
			}
			break;
		}
		case "equpmentGear": {
			const equipGear = gearAmounts[action.gearIndex];
		}
	}
}

const initialGearAmounts: GearInfos = [];