import './App.css';
import ExpInfo from './features/expInfo/ExpInfo';
import Menu from './features/menu/Menu';
import MainContents from './features/main_contents/MainContents';
import RepetemaRPGProviders from './Providers';
import SaveDataManager from './features/saveDataManager/SaveDataManager';

function App() {
  return (
    <RepetemaRPGProviders>
      <SaveDataManager>
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
      </SaveDataManager>
    </RepetemaRPGProviders>
  );
}

export default App;