import { useContext } from "react";
import { GameInfoDispatchContext } from "../../../../contexts/GameInfo";
import { ItemInfoContext } from "../../../../contexts/ItemInfo";
import { ItemId } from "../../../../data/define/item";
import { ItemName } from "../../../../data/parameter/item";

export default function Debug(){
  const gameInfoDispatch = useContext(GameInfoDispatchContext)!;
  const itemInfo = useContext(ItemInfoContext)!;
  return(
  <div>
    <p>これはデバッグ画面です</p>
    <button onClick={
      () => gameInfoDispatch({type:"addGold", gold:1})
      }>1ゴールド追加</button>
    {Object.keys(itemInfo).map((key) => {
      return <p>{ItemName[key as ItemId]}: {itemInfo[key as ItemId]}個</p>
    })}
  </div>
  );
}