import { Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";
import "./MainContents.css";
import { AreaId, DungeonId } from "../../data/define/map";
import { getArea, getDungeon } from "../../utils/utils";
import { useImmer } from "use-immer";
import { CharactersContext } from "../../contexts/Character";
import { BattleProcess } from "./battle_process";

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
            key={dungeon.id}
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
  const [battleLog, updateBattleLog] = useImmer<{logNumber: number, log: string}[]>([{logNumber: 0, log: "戦闘開始"}]);
  const characters = useContext(CharactersContext)!;
  
  if(refBattleProcess.current === null){
    refBattleProcess.current = new BattleProcess(
      (log) => updateBattleLog(draft => {
        draft.push({
          logNumber: draft[draft.length-1].logNumber+1,
          log: log
        });
      }));
  }

  const battleProcess = refBattleProcess.current!;
  const area = getArea(areaId);

  function exitBattle(){
    battleProcess.close();
    setIsBattling(false);
  }

  if(!battleProcess.isBattling){
    const monsterIds = area.monsterPatterns[0].monsterIds;
    battleProcess.start(characters, monsterIds);
  }
  
  return(
    <div className="Battle">
      <p>バトル</p>
      <p>{area.name}</p>
      <button onClick={exitBattle}>マップに戻る</button>
      <p>ログ</p>
      {battleLog.slice(-10).map((log) => <p key={log.logNumber}>{log.log}</p>).reverse()}
    </div>
  );
}