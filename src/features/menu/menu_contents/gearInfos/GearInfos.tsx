import { useContext } from "react";
import { DispatchContext } from "../../../../contexts/Master";
import { GEAR_INFO } from "../../../../data/parameter/gear";
import { GearInfosContext } from "../../../../contexts/GearInfos";

export default function GearInfosTab(){
  const GearInfos = useContext(GearInfosContext)!;
  const dispatch = useContext(DispatchContext)!;
  return(
  <div className="GearInfosTab">
    {GearInfos.map((gearInfo) => {
      return <p>{GEAR_INFO[gearInfo.gearId].name}</p>
    })}
  </div>
  );
}