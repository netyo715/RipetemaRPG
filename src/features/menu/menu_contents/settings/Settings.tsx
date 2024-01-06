import { useContext } from "react";
import { BattleProcessContext, DispatchContext } from "../../../../contexts/Master";

export default function SettingsTab(){
  const dispatch = useContext(DispatchContext)!;
  const refBattleProcess = useContext(BattleProcessContext)!;
  return(
  <div className="SettingsTab">
    <button onClick={() => {
      refBattleProcess.current?.close();
      dispatch({
        type: "resetGame"
      });
    }}>ゲームをリセット</button>
  </div>
  );
}