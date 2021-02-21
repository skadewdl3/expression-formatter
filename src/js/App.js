import React from 'react';

import Navbar from './Navbar';
import MainUI from './MainUI';

const App = () => {
  return (
    <>
      <div className="landing">
        <Navbar />
        <MainUI />
      </div>
    </>
  );
};

export default App;
