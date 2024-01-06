import { useContext } from "react";
import { ItemAmountsContext } from "../../../../contexts/ItemAmounts";
import { ItemId } from "../../../../data/define/item";
import { ITEM_NAME } from "../../../../data/parameter/item";
import { DispatchContext } from "../../../../contexts/Master";
import { CharactersContext } from "../../../../contexts/Characters";
import { JobId } from "../../../../data/define/job";
import { JOB_NAME } from "../../../../data/parameter/job";

export default function Debug(){
  const dispatch = useContext(DispatchContext)!;
  const characters = useContext(CharactersContext)!;
  const itemInfo = useContext(ItemAmountsContext)!;
  if (characters[0].jobs[JobId.TestJob] === null){
    dispatch({
      type: "unlockJob",
      index: 0,
      jobId: JobId.TestJob,
    });
  }
  return(
  <div>
    <p>これはデバッグ画面です</p>
    <button onClick={
      () => dispatch({type:"addGold", gold:1})
      }>1ゴールド追加</button>
    {Object.keys(itemInfo).map((key) => {
      return <p>{ITEM_NAME[key as ItemId]}: {itemInfo[key as ItemId]}個</p>
    })}
    <button onClick={
      () => dispatch({type:"gainExpAll", exp:50})
      }>50経験値</button>
    <hr/>
    <button onClick = {
      () => dispatch({type: "changeJob", index: 0, jobId: JobId.Adventurer})
    }>{JOB_NAME[JobId.Adventurer]}に転職</button>
    <button onClick = {
      () => dispatch({type: "changeJob", index: 0, jobId: JobId.TestJob})
    }>{JOB_NAME[JobId.TestJob]}に転職</button>
    <hr/>
  </div>
  );
}