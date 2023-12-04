import { Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";
import "./MainContents.css";
import { AreaId, DungeonId } from "../../data/define/map";
import { getArea, getDungeon, getMonster } from "../../utils/utils";
import { useImmer } from "use-immer";
import { CharactersContext, CharactersDispatchContext } from "../../contexts/Characters";
import { BattleProcess } from "./battle_process";
import { ItemName } from "../../data/parameter/item";
import { ItemInfoDispatchContext } from "../../contexts/ItemInfo";

export default function MainContents(){
  const [isBattling, setIsBattling] = useState(false);
  const [battleAreaId, setBattleAreaId] = useState(AreaId.TestArea1_1);
  return(
    <div className="MainContents">
      {isBattling
      ? <Battle setIsBattling={setIsBattling} areaId={battleAreaId}/>
      : <Map setIsBattling={setIsBattling} setBattleAreaId={setBattleAreaId}/>
      }
    </div>
  );
}

type MapProps = {
  setIsBattling: Dispatch<SetStateAction<boolean>>,
  setBattleAreaId: Dispatch<SetStateAction<AreaId>>,
}
function Map({setIsBattling, setBattleAreaId}: MapProps){
  const [selectedDungeonId, setSelectedDungeonId] = useState<DungeonId|null>(null);
  return(
    <div className="Map">
      <p>マップ</p>
      {Object.values(DungeonId).reduce((dungeonNodes: ReactNode[], dungeonId: DungeonId) => {
        const dungeon = getDungeon(dungeonId);
        dungeonNodes.push(
          <div
            key={dungeon.name}
            className="Map_dungeon"
            onClick={() => 
              setSelectedDungeonId(dungeonId === selectedDungeonId ? null : dungeonId
            )}
          >
            {dungeon.name}
          </div>
        );
        if(selectedDungeonId === dungeonId){
          dungeon.areaIds.forEach((areaId) => {
            const area = getArea(areaId);
            dungeonNodes.push(
              <div
                key={area.id}
                className="Map_area"
                onClick={() => {
                  setIsBattling(true);
                  setBattleAreaId(area.id);
                }}
              >
                {area.name}
              </div>
            );
          })
        }
        return dungeonNodes;
      }, [])}
    </div>
  );
}

type BattleProps = {
  setIsBattling: Dispatch<SetStateAction<boolean>>,
  areaId: AreaId,
}
function Battle({setIsBattling, areaId}: BattleProps){
  const refBattleProcess = useRef<BattleProcess|null>(null);
  const [battleLog, updateBattleLog] = useImmer<{logNumber: number, log: string}[]>([{logNumber: 0, log: ""}]);
  const characters = useContext(CharactersContext)!;
  const characterDispatch = useContext(CharactersDispatchContext)!;
  const itemInfoDispatch = useContext(ItemInfoDispatchContext)!;
  
  const area = getArea(areaId);

  if(refBattleProcess.current === null){
    initBattle();
  }
  const battleProcess = refBattleProcess.current!;
  if(!battleProcess.isBattling){
    initBattle();
  }

  function initBattle(){
    const monsterIds = area.monsterPatterns[0].monsterIds;
    refBattleProcess.current = new BattleProcess(
      characters,
      monsterIds,
      sendLog,
      // 勝利時
      () => {
        const monsters = monsterIds.map(id => getMonster(id));
        sendLog("戦闘に勝利した！");
        const sumExp = monsters.reduce((acc, val) => acc+val.exp, 0);
        sendLog(`${sumExp} 経験値を手に入れた`);
        characterDispatch({
          type: "gainExpAll",
          exp: sumExp,
        });
        monsters.forEach(((monster) => {
          monster.lootTable.forEach((loot) => {
            if(loot.dropRate > Math.random()*100){
              itemInfoDispatch({
                type: "addItem",
                itemId: loot.itemId,
                amount: loot.amount,
              });
              sendLog(`${ItemName[loot.itemId]}を${loot.amount}個手に入れた`);
            }
          });
        }));
      },
      () => {
        sendLog("全滅した…");
      },
      () => {},
    );
  }

  function exitBattle(){
    battleProcess.close();
    setIsBattling(false);
  }

  function sendLog(log: string){
    updateBattleLog(draft => {
      draft.push({
        logNumber: draft[draft.length-1].logNumber+1,
        log: log
      });
    });
  }
  
  return(
    <div className="Battle">
      <h2>バトル</h2>
      <p>{area.name}</p>
      <button onClick={exitBattle}>マップに戻る</button>
      <h2>味方</h2>
      {battleProcess.allyUnits.map((unit) => {
        return <p>{unit.name} hp: {unit.battleStatus.hp}</p>
      })}
      <h2>モンスター</h2>
      {battleProcess.enemyUnits.map((unit) => {
        return <p>{unit.name} hp: {unit.battleStatus.hp}</p>
      })}
      <h2>ログ</h2>
      {battleLog.slice(-10).map((log) => <p key={log.logNumber}>{log.log}</p>).reverse()}
    </div>
  );
}