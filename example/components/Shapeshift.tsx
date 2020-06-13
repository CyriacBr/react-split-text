import React, { useState, useEffect, useRef } from 'react';
import { SplitText, LetterWrapperProp } from '../../dist';
import { motion, useAnimation } from 'framer-motion';

const LetterWrapper: React.FC<LetterWrapperProp> = ({
  children,
  extraProps: bgColor,
}) => {
  const [letter, setLetter] = useState<string>();
  const oldLetter = useRef<string>(children as string);
  const overlayAnim = useAnimation();
  const contentAnim = useAnimation();
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentAnim.start({
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    if ((children as string) == oldLetter.current) return;
    /**
     * The letter (children) passed to this component changed
     * so we trigger an animation (#1) and set a new value to "letter"
     * so that we can animate the change in the end (#2)
     */
    overlayAnim
      .start({
        width: '100%',
        scaleX: 1,
        transformOrigin: '100% 50%',
      })
      .then(() => {
        setLetter(children as string);
      });
    oldLetter.current = children as string;
  }, [children]);

  useEffect(() => {
    overlayAnim.start({
      scaleX: 0,
      transformOrigin: '100% 50%',
    });
  }, [letter]);

  return (
    <motion.div
      ref={elRef}
      style={{
        display: 'inline-block',
        marginBottom: '1.5rem',
        transition: 'all .5s ease',
        position: 'relative',
      }}
      transition={{
        ease: 'easeOut',
        duration: 0.5,
      }}
      initial={{ opacity: 1 }}
      animate={contentAnim}
    >
      <motion.div
        transition={{
          ease: 'anticipate',
          duration: 0.5,
        }}
        initial={{ scaleX: 0 }}
        animate={overlayAnim}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: bgColor,
        }}
      ></motion.div>
      <span style={{ whiteSpace: 'pre' }}>
        {letter || oldLetter.current || children}
      </span>
    </motion.div>
  );
};
const MemoizedLetterWrapper = React.memo(LetterWrapper);

export interface ShapeshiftProps {
  bgColor: string;
  textArray: string[];
  textIndex: number;
}

export const Shapeshift: React.FC<ShapeshiftProps> = ({
  bgColor,
  textArray,
  textIndex,
}) => {
  const [text, setText] = useState(textArray[0]);
  useEffect(() => {
    setText(textArray[textIndex]);
  }, [textIndex]);

  return (
    <SplitText
      style={{ fontFamily: 'monospace', position: 'relative' }}
      LetterWrapper={MemoizedLetterWrapper}
      extraProps={bgColor}
    >
      {text}
    </SplitText>
  );
};
