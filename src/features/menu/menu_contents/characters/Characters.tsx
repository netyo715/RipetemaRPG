import { useContext } from "react";
import { CharactersContext } from "../../../../contexts/Characters";
import { DispatchContext } from "../../../../contexts/Master";
import { GearType } from "../../../../types/gear";
import { GEAR_INFO, GEAR_TYPE_NAME } from "../../../../data/parameter/gear";

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
          {([
            GearType.Weapon,
            GearType.Shield,
            GearType.Head,
            GearType.Body,
            GearType.Hand,
            GearType.Leg,
            GearType.Accessory
          ] as GearType[]).map((gearType) => {
            return <p>{GEAR_TYPE_NAME[gearType]} { 
              character.gear[gearType] !== null 
                ? GEAR_INFO[character.gear[gearType]!].name
                : "なし"
            }<button onClick={() => dispatch({type: "unequipmentGear", characterIndex: character.index, gearType: gearType})}>外す</button>
            </p>
          })}
        </p>
      </div>
    })}
  </div>
  );
}