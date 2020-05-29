import * as React from 'react';
import { SplitText, WordWrapperProp } from '../../dist';
import { motion } from 'framer-motion';

const WordWrapper: React.FC<WordWrapperProp> = ({ children, countIndex }) => {
  return (
    <motion.span
      transition={{
        ease: 'easeOut',
        duration: 1,
        delay: 0.125 * countIndex,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.span>
  );
};
const MemoizedWordWrapper = React.memo(WordWrapper);

export const FadeIn: React.FC = () => {
  return (
    <SplitText WordWrapper={MemoizedWordWrapper}>
      Hello wolrd from the FadeIn Component!
    </SplitText>
  );
};
