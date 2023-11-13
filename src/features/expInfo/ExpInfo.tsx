import { useContext } from "react";
import "./ExpInfo.css"
import { GameInfoContext } from "../../contexts/GameInfo";

export default function ExpInfo() {
  const gameInfo = useContext(GameInfoContext)!;
  return (
    <div className="ExpInfo">
      ゴールド: {gameInfo.gold}
    </div>
  );
}
