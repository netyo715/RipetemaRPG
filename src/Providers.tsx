import { Children, ReactNode } from "react";
import { CharactersProvider } from "./contexts/Characters";
import { GameInfoProvider } from "./contexts/GameInfo";
import { GearInfosProvider } from "./contexts/GearInfos";
import { ItemAmountsProvider } from "./contexts/ItemAmounts";
import { MasterDataProvider } from "./contexts/Master";

export default function RepetemaRPGProviders({children}: {children: ReactNode}) {
  return <MasterDataProvider>
    <GameInfoProvider>
      <CharactersProvider>
        <GearInfosProvider>
          <ItemAmountsProvider>
            {children}
          </ItemAmountsProvider>
        </GearInfosProvider>
      </CharactersProvider>
    </GameInfoProvider>
  </MasterDataProvider>
}