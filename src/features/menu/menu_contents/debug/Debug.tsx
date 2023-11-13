import { useContext } from "react";
import { GameInfoDispatchContext } from "../../../../contexts/GameInfo";

export default function Debug(){
  const gameInfoDispatch = useContext(GameInfoDispatchContext)!;
  return(
  <div>
    <p>これはデバッグ画面です</p>
    <button onClick={
      () => gameInfoDispatch({type:"addGold", gold:1})
      }>1ゴールド追加</button>
  </div>
  );
}