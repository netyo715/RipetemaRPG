import './App.css';
import ExpInfo from './features/expInfo/ExpInfo';
import { GameInfoProvider } from './contexts/GameInfo';
import { CharactersProvider } from './contexts/Characters';
import Menu from './features/menu/Menu';
import MainContents from './features/main_contents/MainContents';
import { ItemAmountsProvider } from './contexts/ItemAmounts';
import { MasterDataProvider } from './contexts/Master';

function App() {
  return (
    <MasterDataProvider>
      <GameInfoProvider>
        <CharactersProvider>
          <ItemAmountsProvider>
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
          </ItemAmountsProvider>
        </CharactersProvider>
      </GameInfoProvider>
    </MasterDataProvider>
  );
}

export default App;