import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';
import { Examples } from './Examples';

const App = () => {
  return <Examples />;
};

ReactDOM.render(<App />, document.getElementById('root'));
