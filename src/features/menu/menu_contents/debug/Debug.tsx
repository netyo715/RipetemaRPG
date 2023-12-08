import { useContext } from "react";
import { ItemAmountsContext } from "../../../../contexts/ItemAmounts";
import { ItemId } from "../../../../data/define/item";
import { ItemName } from "../../../../data/parameter/item";
import { DispatchContext } from "../../../../contexts/Master";

export default function Debug(){
  const dispatch = useContext(DispatchContext)!;
  const itemInfo = useContext(ItemAmountsContext)!;
  return(
  <div>
    <p>これはデバッグ画面です</p>
    <button onClick={
      () => dispatch({type:"addGold", gold:1})
      }>1ゴールド追加</button>
    {Object.keys(itemInfo).map((key) => {
      return <p>{ItemName[key as ItemId]}: {itemInfo[key as ItemId]}個</p>
    })}
    <button onClick={
      () => dispatch({type:"gainExpAll", exp:50})
      }>50経験値</button>
  </div>
  );
}