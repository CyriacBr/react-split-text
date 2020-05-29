import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Frame } from './components/Frame';
import { FadeIn } from './components/FadeIn';
import './styles.css';

const App = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Frame bg="#F56565" color="#F7FAFC">
        <FadeIn />
      </Frame>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
