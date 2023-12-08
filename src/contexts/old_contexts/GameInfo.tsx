import { useImmerReducer } from "use-immer";
import { Dispatch, ReactNode, createContext } from "react";
import { GameInfo, getDefaultGameInfo } from "../../types/gameInfo";

export const GameInfoContext = createContext<GameInfo | null>(null);
export const GameInfoDispatchContext = createContext<Dispatch<GameInfoAction> | null>(null);

export function GameInfoProvider({children}: {children: ReactNode}) {
	const [gameInfo, dispatch] = useImmerReducer(gameInfoReducer, initialGameInfo);
	return(
		<GameInfoContext.Provider value={gameInfo}>
			<GameInfoDispatchContext.Provider value={dispatch}>
				{children}
			</GameInfoDispatchContext.Provider>
		</GameInfoContext.Provider>
	)
}

type GameInfoAction = 
|{
	type: "addGold";
	gold: number;
}

function gameInfoReducer(characters: GameInfo, action: GameInfoAction){
	switch (action.type){
		case "addGold": {
			characters.gold += action.gold;
			break;
		}
	}
}

const initialGameInfo = getDefaultGameInfo();