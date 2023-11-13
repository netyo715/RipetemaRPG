import './App.css';
import ExpInfo from './features/expInfo/ExpInfo';
import { GameInfoProvider } from './contexts/GameInfo';
import { CharactersProvider } from './contexts/Character';
import Menu from './features/menu/Menu';
import MainContents from './features/main_contents/MainContents';

function App() {
  /*
  const isContinueBattle = useRef(false);
  const adventurer = useRef(new Adventurer(5));
  */

  return (
    /*<div className="App">
      <Battle isContinueBattle={isContinueBattle} adventurer={adventurer.current}></Battle>
      <button className="btn" onClick={() => isContinueBattle.current = false}>出撃終了</button>
      <button className="btn" onClick={() => adventurer.current.spd++}>+</button>
      <button className="btn" onClick={() => adventurer.current.spd--}>-</button>
    </div>*/
    <GameInfoProvider>
      <CharactersProvider>
        <div className="App">
          <div className="App_left">
            <div className="App_left_top">
              <ExpInfo/>
            </div>
            <div className="App_left_bottom">
              <MainContents/>
            </div>
          </div>
          <div className="App_right">
            <Menu/>
          </div>
        </div>
      </CharactersProvider>
    </GameInfoProvider>
  );
}

export default App;