import React, {
  useRef,
  useLayoutEffect,
  useState,
  ComponentType,
  memo,
  CSSProperties,
  FC,
} from 'react';

export interface LineWrapperProp {
  lineIndex: number;
}
export interface WordWrapperProp {
  lineIndex: number;
  wordIndex: number;
  countIndex: number;
}

export interface SplitTextProps {
  className?: string;
  style?: CSSProperties;
  LineWrapper?: ComponentType<LineWrapperProp>;
  WordWrapper?: ComponentType<WordWrapperProp>;
}

const DefaultWrapper = memo(function DefaultWrapper({ children }) {
  return <span>{children}</span>;
});

export const SplitText: FC<SplitTextProps> = ({
  children,
  className,
  style,
  LineWrapper = DefaultWrapper,
  WordWrapper = DefaultWrapper,
}) => {
  const text = children as string;
  const elRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let lastY;
    let lines: string[] = [];
    let words: string[] = [];
    for (const child of Array.from(el.children)) {
      const y = child.getBoundingClientRect().top;
      if (lastY == null) lastY = y;
      if (y !== lastY) {
        lines.push(words.join(' '));
        words = [];
      }
      lastY = y;
      words.push((child.textContent || '').trim());
    }
    lines.push(words.join(' '));
    setLines(lines);
  }, []);

  return lines.length ? (
    <div className={className} ref={elRef} style={style}>
      {lines.map((line, i) => {
        const characters = line.split(' ');
        return (
          <LineWrapper key={i} lineIndex={i}>
            {characters.map((char, j) => (
              <WordWrapper
                lineIndex={i}
                wordIndex={j}
                countIndex={characters.length * i + j}
                key={j}
              >
                {char}{' '}
              </WordWrapper>
            ))}
          </LineWrapper>
        );
      })}
    </div>
  ) : (
    <div className={className} ref={elRef} style={style}>
      {text.split(' ').map((word, i) => (
        <WordWrapper lineIndex={0} wordIndex={i} countIndex={i} key={i}>
          {word}{' '}
        </WordWrapper>
      ))}
    </div>
  );
};
