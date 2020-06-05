import React, {
  useState,
  ComponentType,
  CSSProperties,
  FC,
  useEffect,
} from 'react';
import {
  LineWrapperProp,
  WordWrapperProp,
  LetterWrapperProp,
} from './Wrappers';
import { SplitTextInner } from './SplitTextInner';

export interface SplitTextProps<T = any> {
  /**
   * className to forward to the container.
   * @type string
   */
  className?: string;
  /**
   * A style oject to forward to the container.
   * @type CSSProperties
   */
  style?: CSSProperties;
  /**
   * A custom component to wrap each split line.
   * @type ComponentType<LineWrapperProp>
   */
  LineWrapper?: ComponentType<LineWrapperProp>;
  /**
   * A custom component to wrap each split word.
   * @type ComponentType<WordWrapperProp>
   */
  WordWrapper?: ComponentType<WordWrapperProp>;
  /**
   * A custom component to wrap each split letter.
   * @type ComponentType<LetterWrapperProp>
   */
  LetterWrapper?: ComponentType<LetterWrapperProp>;
  /**
   * An extra value that will be forwarded to each wrappers.
   * @type T = any
   */
  extraProps?: T;
}

export const SplitText: FC<SplitTextProps> = ({ children, ...props }) => {
  const [key, setKey] = useState(0);

  function onResize() {
    setKey(v => v + 1);
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <SplitTextInner key={key} {...props}>
      {children}
    </SplitTextInner>
  );
};
