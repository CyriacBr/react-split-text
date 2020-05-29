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
export interface LetterWrapperProp {
  lineIndex: number;
  wordIndex: number;
  letterIndex: number;
  countIndex: number;
}

export interface SplitTextProps {
  className?: string;
  style?: CSSProperties;
  LineWrapper?: ComponentType<LineWrapperProp>;
  WordWrapper?: ComponentType<WordWrapperProp>;
  LetterWrapper?: ComponentType<LetterWrapperProp>;
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
  LetterWrapper = DefaultWrapper,
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

  let wordCount = 0;
  let letterCount = 0;

  return lines.length ? (
    <div className={className} ref={elRef} style={style}>
      {lines.map((line, i) => {
        const words = line.split(' ');
        return (
          <LineWrapper key={i} lineIndex={i}>
            {words.map((word, j) => {
              const letters = (word + ' ').split('');
              return (
                <WordWrapper
                  lineIndex={i}
                  wordIndex={j}
                  countIndex={wordCount++}
                  key={j}
                >
                  {letters.map((char, k) => (
                    <LetterWrapper
                      lineIndex={i}
                      wordIndex={j}
                      letterIndex={k}
                      countIndex={letterCount++}
                      key={k}
                    >
                      {char}
                    </LetterWrapper>
                  ))}
                </WordWrapper>
              );
            })}
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
