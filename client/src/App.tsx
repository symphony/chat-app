import React from 'react';
import 'styles/App.css';

import Button from '@mui/material/Button';

const App = () => {
  return (
    <div className='App'>
      <p>
        <header>Hello world</header>
        <Button variant="contained" color="primary">
          Click
        </Button>
      </p>
    </div>
  );
}

export default App;
