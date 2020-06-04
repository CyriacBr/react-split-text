import * as React from 'react';
import { SplitText, WordWrapperProp, LineWrapperProp } from '../../dist';
import { motion } from 'framer-motion';

const WordWrapper: React.FC<WordWrapperProp<string>> = ({
  children,
  countIndex,
  extraProps: bgColor,
}) => {
  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block' }}
      initial={{ y: '30%' }}
      animate={{ y: '0%' }}
      transition={{
        ease: 'easeOut',
        duration: 1,
        delay: 0.125 * countIndex,
      }}
    >
      <motion.div
        transition={{
          ease: 'circOut',
          duration: 1.2,
          delay: 0.125 + 0.125 * countIndex,
        }}
        initial={{ height: '100%' }}
        animate={{ height: '0%' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          backgroundColor: bgColor,
        }}
      ></motion.div>
      <span style={{ whiteSpace: 'pre' }}>{children}</span>
    </motion.div>
  );
};
const LineWrapper: React.FC<LineWrapperProp> = ({ children }) => {
  return (
    <span style={{ overflow: 'hidden', display: 'block' }}>{children}</span>
  );
};
const MemoizedWordWrapper = React.memo(WordWrapper);
const MemoizedLineWrapper = React.memo(LineWrapper);

export interface RevealProps {
  bgColor: string;
}

export const Reveal: React.FC<RevealProps> = ({ bgColor }) => {
  return (
    <SplitText
      WordWrapper={MemoizedWordWrapper}
      LineWrapper={MemoizedLineWrapper}
      extraProps={bgColor}
    >
      Hello wolrd from the Reveal Component!
    </SplitText>
  );
};
