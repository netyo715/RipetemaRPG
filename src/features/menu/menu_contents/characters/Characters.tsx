import { useContext } from "react";
import { CharactersContext } from "../../../../contexts/Characters";
import { DispatchContext } from "../../../../contexts/Master";
import { GearType } from "../../../../types/gear";
import { GEAR_INFO } from "../../../../data/parameter/gear";

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
        <p>装備<br/>
          武器: {
            character.gear[GearType.Weapon] !== null 
              ? GEAR_INFO[character.gear[GearType.Weapon]!].name
              : "なし"
          }<br/>
          盾: {
            character.gear[GearType.Shield] !== null 
              ? GEAR_INFO[character.gear[GearType.Shield]!].name
              : "なし"
          }<br/>
          頭: {
            character.gear[GearType.Head] !== null 
              ? GEAR_INFO[character.gear[GearType.Head]!].name
              : "なし"
          }<br/>
          体: {
            character.gear[GearType.Body] !== null 
              ? GEAR_INFO[character.gear[GearType.Body]!].name
              : "なし"
          }<br/>
          手: {
            character.gear[GearType.Hand] !== null 
              ? GEAR_INFO[character.gear[GearType.Hand]!].name
              : "なし"
          }<br/>
          脚: {
            character.gear[GearType.Leg] !== null 
              ? GEAR_INFO[character.gear[GearType.Leg]!].name
              : "なし"
          }<br/>
          アクセサリー: {
            character.gear[GearType.Accessory] !== null 
              ? GEAR_INFO[character.gear[GearType.Accessory]!].name
              : "なし"
          }<br/>
        </p>
      </div>
    })}
  </div>
  );
}