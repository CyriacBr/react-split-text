import React from 'react';

export interface LineWrapperProp<T = any> {
  /**
   * The index of this line wrapper.
   */
  lineIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;
}

export const LineWrapper: React.FC<LineWrapperProp> = ({ children }) => (
  <span>{children}</span>
);

export interface WordWrapperProp<T = any> {
  /**
   * The current line index where this word wrapper lives.
   */
  lineIndex: number;
  /**
   * The index of this word wrapper.
   */
  wordIndex: number;
  /**
   * The current index of the total wrapped words inside <SplitText />.
   */
  countIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;
}

export const WordWrapper: React.FC<WordWrapperProp> = ({ children }) => (
  <span>{children}</span>
);

export interface LetterWrapperProp<T = any> {
  /**
   * The current line index where this letter wrapper lives.
   */
  lineIndex: number;
  /**
   * The current word index where this letter wrapper lives.
   */
  wordIndex: number;
  /**
   * The index of this letter wrapper.
   */
  letterIndex: number;
  /**
   * The current index of the total wrapped letters inside <SplitText />.
   */
  countIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;
}

export const LetterWrapper: React.FC<LetterWrapperProp> = ({ children }) => (
  <span>{children}</span>
);
