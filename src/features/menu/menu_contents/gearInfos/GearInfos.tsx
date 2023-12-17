import { useContext } from "react";
import { DispatchContext } from "../../../../contexts/Master";
import { GEAR_INFO } from "../../../../data/parameter/gear";
import { GearInfosContext } from "../../../../contexts/GearInfos";

export default function GearInfosTab(){
  const GearInfos = useContext(GearInfosContext)!;
  const dispatch = useContext(DispatchContext)!;
  return(
  <div className="GearInfosTab">
    {GearInfos.map((gearInfo, index) => {
      if (gearInfo.equippedCharacterIndex === null){
        return <>
          <p>{GEAR_INFO[gearInfo.gearId].name}</p>
          <button onClick={() => {
            dispatch({
              type: "equipmentGear",
              characterIndex: 0,
              gearIndex: index,
            });
          }}>装備する</button>
        </>
      }
      return <>
        <p>{GEAR_INFO[gearInfo.gearId].name}</p>
        <p>装備中</p>
      </>
    })}
  </div>
  );
}