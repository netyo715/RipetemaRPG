import { useImmerReducer } from "use-immer";
import { Dispatch, ReactNode, createContext } from "react";
import { Character, changeJob, gainExp, getDefaultCharacter } from "../types/character";
import { JobId } from "../data/define/job";

export const CharactersContext = createContext<Character[] | null>(null);
export const CharactersDispatchContext = createContext<Dispatch<CharactersAction> | null>(null);

export function CharactersProvider({children}: {children: ReactNode}) {
	const [characters, dispatch] = useImmerReducer(characterReducer, initialCharacters);
	return(
		<CharactersContext.Provider value={characters}>
			<CharactersDispatchContext.Provider value={dispatch}>
				{children}
			</CharactersDispatchContext.Provider>
		</CharactersContext.Provider>
	)
}

type CharactersAction = 
|{
	type: "changeJob";
	index: number;
	jobId: JobId;
}
|{
	type: "gainExpAll";
	exp: number;
}

function characterReducer(characters: Character[], action: CharactersAction){
	switch (action.type){
		case "changeJob": {
			changeJob(characters[action.index], action.jobId);
			break;
		}
		case "gainExpAll": {
			characters.forEach((character) => {
				gainExp(character, action.exp);
			});
			break;
		}
	}
}

const initialCharacters = [
	getDefaultCharacter(0)
];