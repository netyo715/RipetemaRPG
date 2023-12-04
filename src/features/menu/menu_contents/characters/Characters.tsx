import { useContext } from "react";
import { GameInfoDispatchContext } from "../../../../contexts/GameInfo";
import { CharactersContext, CharactersDispatchContext } from "../../../../contexts/Characters";

export default function CharctersTab(){
  const Characters = useContext(CharactersContext)!;
  const CharactersDispatch = useContext(CharactersDispatchContext)!;
  return(
  <div className="CharactersTab">
    {Characters.map((character) => {
      return <div>
        <p>名前: {character.name} 職業: {character.currentJob.name}<br/>
          レベル: {character.level} 次のレベルまで: {character.requirementExp}<br/>
          職業レベル: {character.currentJob.level} 次のレベルまで: {character.currentJob.requirementExp}
        </p>
        <p>ステータス<br/>
          HP: {character.status.hp}<br/>
          ATK: {character.status.atk}<br/>
          DEF: {character.status.def}<br/>
          MAT: {character.status.mat}<br/>
          MDF: {character.status.mdf}<br/>
          SPD: {character.status.spd}<br/>
          CRT: {character.status.crt}<br/>
        </p>
      </div>
    })}
  </div>
  );
}