import { ReactNode, createContext, useContext } from "react";
import { Character } from "../types/character";
import { MasterDataContext } from "./Master";

export const CharactersContext = createContext<Character[] | null>(null);

export function CharactersProvider({children}: {children: ReactNode}) {
	const characters = useContext(MasterDataContext)!.characters;
	return(
		<CharactersContext.Provider value={characters}>
			{children}
		</CharactersContext.Provider>
	)
}