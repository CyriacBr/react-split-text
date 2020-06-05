import * as React from 'react';
import { SplitText, WordWrapperProp, LineWrapperProp } from '../../dist';
import { motion } from 'framer-motion';

const WordWrapper: React.FC<WordWrapperProp> = ({ children, wordIndex }) => {
  return (
    <motion.span
      transition={{
        ease: 'easeOut',
        duration: 1,
        delay: 0.125 * wordIndex,
      }}
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      style={{ display: 'inline-block', whiteSpace: 'pre' }}
    >
      {children}
    </motion.span>
  );
};
const LineWrapper: React.FC<LineWrapperProp> = ({ children }) => {
  return (
    <span style={{ overflow: 'hidden', display: 'block' }}>{children}</span>
  );
};
const MemoizedWordWrapper = React.memo(WordWrapper);
const MemoizedLineWrapper = React.memo(LineWrapper);

export const Raise: React.FC = () => {
  return (
    <SplitText
      WordWrapper={MemoizedWordWrapper}
      LineWrapper={MemoizedLineWrapper}
    >
      Hello world from the Raise Component!
    </SplitText>
  );
};
