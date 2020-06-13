import * as React from 'react';
import { SplitText, LetterWrapperProp, WordWrapperProp } from '../../dist';
import { motion } from 'framer-motion';

const LetterWrapper: React.FC<LetterWrapperProp> = ({
  children,
  countIndex,
}) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{children}</span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <motion.span
          transition={{
            ease: 'anticipate',
            duration: 1,
            delay: 0.055 * countIndex,
          }}
          initial={{ x: '-100%', scaleX: 1 }}
          animate={{ x: '0%', scaleX: 1 }}
          style={{ display: 'inline-block', transformOrigin: '0% 50%' }}
        >
          {children}
        </motion.span>
      </span>
    </div>
  );
};
const WordWrapper: React.FC<WordWrapperProp> = ({ children }) => {
  return <span style={{ whiteSpace: 'pre' }}>{children}</span>;
};
const MemoizedLetterWrapper = React.memo(LetterWrapper);
const MemoizedWordWrapper = React.memo(WordWrapper);

export const Banner: React.FC = () => {
  return (
    <SplitText
      LetterWrapper={MemoizedLetterWrapper}
      WordWrapper={MemoizedWordWrapper}
      style={{
        fontSize: 80,
        textAlign: 'center',
        fontWeight: 'bold',
      }}
    >
      React Split Text
    </SplitText>
  );
};
