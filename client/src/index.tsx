import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React 18 setup
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './styles/index.css';

// const container = document.getElementById('app');
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<App />);