import logo from './logo.svg';
import './App.css';
import SSEComponent from './SSEComponent.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SSEComponent/>
      </header>
    </div>
  );
}

export default App;
