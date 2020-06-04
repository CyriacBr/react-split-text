import * as React from 'react';
import { SplitText, LetterWrapperProp, WordWrapperProp } from '../../dist';
import { motion } from 'framer-motion';

const LetterWrapper: React.FC<LetterWrapperProp> = ({
  children,
  countIndex,
}) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        style={{
          // textShadow:
          //   '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          WebkitTextStroke: '#2D3748 2px',
        }}
      >
        {children}
      </span>
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
            duration: 0.5,
            delay: 0.025 * countIndex,
          }}
          initial={{
            clipPath: `polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)`,
          }}
          animate={{ clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` }}
          style={{ display: 'inline-block', color: 'white' }}
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

export interface FillingProps {
  bgColor: string;
}

export const Filling: React.FC<FillingProps> = ({ bgColor }) => {
  return (
    <SplitText
      style={{ color: bgColor }}
      LetterWrapper={MemoizedLetterWrapper}
      WordWrapper={MemoizedWordWrapper}
    >
      Hello wolrd from the Filling Component!
    </SplitText>
  );
};
