import * as React from 'react';
import { Frame } from './components/Frame';
import { FadeIn } from './components/FadeIn';
import { Raise } from './components/Raise';
import './styles.css';
import { LetterDash } from './components/LetterDash';
import { Filling } from './components/Filling';
import { Reveal } from './components/Reveal';
import { Shapeshift } from './components/Shapeshift';

export const Examples = () => {
  const [shapeshiftIndex, setShapeshiftIndex] = React.useState(0);

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <Frame bg="#4299E1" color="#F7FAFC" title="Reveal">
        <Reveal bgColor="#4299E1" />
      </Frame>
      <Frame bg="#F56565" color="#F7FAFC" title="Fade In">
        <FadeIn />
      </Frame>
      <Frame bg="#ED8936" color="#F7FAFC" title="Raise">
        <Raise />
      </Frame>
      <Frame bg="#48BB78" color="#F7FAFC" title="Letter Dash">
        <LetterDash />
      </Frame>
      <Frame bg="#38B2AC" color="#F7FAFC" title="Filling">
        <Filling bgColor="#38B2AC" />
      </Frame>
      <Frame
        bg="#9F7AEA"
        color="#F7FAFC"
        title="Shapeshift"
        onClick={() => setShapeshiftIndex(v => (v === 1 ? 0 : v + 1))}
      >
        <Shapeshift
          bgColor="#9F7AEA"
          textArray={[
            'Click here to see something cool',
            'Here we go. Try again',
          ]}
          textIndex={shapeshiftIndex}
        />
      </Frame>
    </div>
  );
};
