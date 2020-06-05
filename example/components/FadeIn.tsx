import * as React from 'react';
import { SplitText, LetterWrapperProp } from '../../dist';
import { motion } from 'framer-motion';

const LetterWrapper: React.FC<LetterWrapperProp> = ({
  children,
  countIndex,
}) => {
  return (
    <motion.span
      transition={{
        ease: 'easeOut',
        duration: 1,
        delay: 0.025 * countIndex,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.span>
  );
};
const MemoizedLetterWrapper = React.memo(LetterWrapper);

export const FadeIn: React.FC = () => {
  return (
    <SplitText LetterWrapper={MemoizedLetterWrapper}>
      Hello world from the FadeIn Component!
    </SplitText>
  );
};
