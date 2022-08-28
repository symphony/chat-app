import React from 'react';
import Snowpack from 'components/Snowpack';
import 'styles/App.css';
import Logo from './logo.svg';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Logo className='App-logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
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
