import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Frame } from './components/Frame';
import { FadeIn } from './components/FadeIn';
import { Raise } from './components/Raise';
import './styles.css';

const App = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Frame bg="#F56565" color="#F7FAFC" title="Fade In">
        <FadeIn />
      </Frame>
      <Frame bg="#ED8936" color="#F7FAFC" title="Raise">
        <Raise />
      </Frame>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
