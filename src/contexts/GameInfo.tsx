import { ReactNode, createContext, useContext } from "react";
import { GameInfo } from "../types/gameInfo";
import { MasterDataContext } from "./Master";

export const GameInfoContext = createContext<GameInfo | null>(null);

export function GameInfoProvider({children}: {children: ReactNode}) {
	const gameInfo = useContext(MasterDataContext)!.gameInfo;
	return(
		<GameInfoContext.Provider value={gameInfo}>
			{children}
		</GameInfoContext.Provider>
	)
}
