import { useContext } from "react";
import { CharactersContext } from "../../../../contexts/Characters";
import { DispatchContext } from "../../../../contexts/Master";

export default function CharctersTab(){
  const Characters = useContext(CharactersContext)!;
  const dispatch = useContext(DispatchContext)!;
  return(
  <div className="CharactersTab">
    {Characters.map((character) => {
      const job = character.jobs[character.currentJobId]!;
      return <div>
        <p>名前: {character.name} 職業: {job.name}<br/>
          レベル: {character.level} 次のレベルまで: {character.requirementExp-character.exp}<br/>
          職業レベル: {job.level} 次のレベルまで: {job.requirementExp-job.exp}
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