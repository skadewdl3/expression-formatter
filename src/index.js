import React from 'react';
import { render } from 'react-dom';

import './stylus/main.styl';
import App from './js/App';

const root = document.querySelector('#root');

render(<App />, root);

if (module.hot) module.hot.accept();
