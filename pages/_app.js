import React from 'react';
import { WindowWidthProvider } from '../context/WindowWidthContext';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  </WindowWidthProvider>
);

export default App;
