import { useContext } from "react";
import "./ExpInfo.css"
import { GameInfoContext } from "../../contexts/GameInfo";
import { CharactersContext } from "../../contexts/Characters";

export default function ExpInfo() {
  const gameInfo = useContext(GameInfoContext)!;
  const characters = useContext(CharactersContext)!;
  return (
    <div className="ExpInfo">
      <p>ゴールド: {gameInfo.gold}</p>
      {characters.map((character) => {
        const job = character.currentJob;
        return <p>名前: {character.name} 職業: {job.name}<br/>
          レベル: {character.level} 次のレベルまで: {character.requirementExp - character.exp}<br/>
          職業レベル: {job.level} 次のレベルまで: {job.requirementExp - job.exp}
          </p>
      })}
    </div>
  );
}
