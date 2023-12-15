import { ReactNode, createContext, useContext } from "react";
import { GearInfos } from "../types/gear";
import { MasterDataContext } from "./Master";

export const GearInfosContext = createContext<GearInfos | null>(null);

export function GearInfosProvider({children}: {children: ReactNode}) {
	const gearInfos = useContext(MasterDataContext)!.gearInfos;
	return(
		<GearInfosContext.Provider value={gearInfos}>
			{children}
		</GearInfosContext.Provider>
	)
}
