import { useContext } from "react";
import { CharactersContext } from "../../../../contexts/Characters";
import { DispatchContext } from "../../../../contexts/Master";

export default function CharctersTab(){
  const Characters = useContext(CharactersContext)!;
  const dispatch = useContext(DispatchContext)!;
  return(
  <div className="CharactersTab">
    {Characters.map((character) => {
      return <div>
        <p>名前: {character.name} 職業: {character.currentJob.name}<br/>
          レベル: {character.level} 次のレベルまで: {character.requirementExp-character.exp}<br/>
          職業レベル: {character.currentJob.level} 次のレベルまで: {character.currentJob.requirementExp-character.currentJob.exp}
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