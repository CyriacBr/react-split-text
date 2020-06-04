import React from 'react';
import t from 'prop-types';

export interface LineWrapperProp<T = any> {
  lineIndex: number;
  extraProps?: T;
}

export const LineWrapper: React.FC<LineWrapperProp> = ({ children }) => (
  <span>{children}</span>
);
LineWrapper.propTypes = {
  /**
   * The index of this line wrapper
   */
  lineIndex: t.number.isRequired,
  /**
   * Extra props forwarded from SplitText
   */
  extraProps: t.any,
};

export interface WordWrapperProp<T = any> {
  lineIndex: number;
  wordIndex: number;
  countIndex: number;
  extraProps?: T;
}

export const WordWrapper: React.FC<WordWrapperProp> = ({ children }) => (
  <span>{children}</span>
);
WordWrapper.propTypes = {
  /**
   * The current line index where this word wrapper lives
   */
  lineIndex: t.number.isRequired,
  /**
   * The index of this word wrapper
   */
  wordIndex: t.number.isRequired,
  /**
   * The current index of the total wrapped words inside <SplitText />
   */
  countIndex: t.number.isRequired,
  /**
   * Extra props forwarded from SplitText
   */
  extraProps: t.any,
};

export interface LetterWrapperProp<T = any> {
  lineIndex: number;
  wordIndex: number;
  letterIndex: number;
  countIndex: number;
  extraProps?: T;
}

export const LetterWrapper: React.FC<LetterWrapperProp> = ({ children }) => (
  <span>{children}</span>
);
LetterWrapper.propTypes = {
  /**
   * The current line index where this letter wrapper lives
   */
  lineIndex: t.number.isRequired,
  /**
   * The current word index where this letter wrapper lives
   */
  wordIndex: t.number.isRequired,
  /**
   * The index of this letter wrapper
   */
  letterIndex: t.number.isRequired,
  /**
   * The current index of the total wrapped letters inside <SplitText />
   */
  countIndex: t.number.isRequired,
  /**
   * Extra props forwarded from SplitText
   */
  extraProps: t.any,
};
