import React, {
  useState,
  ComponentType,
  CSSProperties,
  FC,
  useEffect,
  forwardRef,
  useCallback,
} from 'react';
import {
  LineWrapperProp,
  WordWrapperProp,
  LetterWrapperProp,
} from './Wrappers';
import { SplitTextInner } from './SplitTextInner';
import { debounce } from '../utils';

export interface SplitTextProps<T = any> {
  /**
   * className to forward to the container.
   * @type string
   */
  className?: string;
  /**
   * A style object to forward to the container.
   * @type CSSProperties
   */
  style?: CSSProperties;
  /**
   * A React ref to forward to the container.
   * @type A React ref
   */
  ref?: ((instance: unknown) => void) | React.MutableRefObject<unknown> | null;
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

export const SplitText: FC<SplitTextProps> = forwardRef(function SplitText(
  { children, ...props },
  ref
) {
  const [key, setKey] = useState(0);

  const onResize = debounce(() => setKey(v => v + 1), 300);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <SplitTextInner key={key} {...props} ref={ref}>
      {children}
    </SplitTextInner>
  );
});
