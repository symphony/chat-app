import Snowpack from "./components/Snowpack";
import logo from './logo.svg';
import './styles/App.css';
console.log('works too');
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <div>
        <h2>hello ❄️Snowpack❄️</h2>
        <Snowpack />
      </div>
    </div>
  );
}

export default App;
