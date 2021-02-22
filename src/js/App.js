import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Navbar from './Navbar';
import MainUI from './MainUI';
import Help from './Help';

const App = () => {
  return (
    <HashRouter>
      <Route
        exact
        path="/"
        render={() => (
          <div className="landing">
            <Navbar page="home" />
            <MainUI />
          </div>
        )}
      />
      <Route path="/help" component={Help} />
    </HashRouter>
  );
};

export default App;
