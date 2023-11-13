import React, { MutableRefObject, useEffect, useState } from 'react';
import './Battle.css'
import { Adventurer } from '../../Adventurer';

interface ChildProps{
  isContinueBattle: MutableRefObject<boolean>;
  adventurer: Adventurer;
}

function Battle(props: ChildProps) {
  function turn(elapsedTime: number) {
    if (!props.isContinueBattle.current){
      console.log("battle end");
      return;
    }
    console.log("attack!", elapsedTime);
    const interval = 5000/props.adventurer.spd
    setTimeout(turn, interval, elapsedTime+interval);
  }
  function initBattle(){
    props.isContinueBattle.current = true;
    turn(0);
  }
  return (
    <div className="Battle">
      <div className="Monster"></div>
      <button className="btn" onClick={initBattle}>出撃開始</button>
    </div>
  );
}

export default Battle;
