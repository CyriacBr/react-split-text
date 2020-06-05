import React, { useRef, useLayoutEffect, useState, memo, FC } from 'react';
import { LineWrapper, WordWrapper, LetterWrapper } from './Wrappers';
import { SplitTextProps } from './SplitText';

const DefaultLineWrapper = memo(LineWrapper);
const DefaultWordWrapper = memo(WordWrapper);
const DefaultLetterWrapper = memo(LetterWrapper);

export const SplitTextInner: FC<SplitTextProps> = ({
  children,
  className,
  style,
  LineWrapper = DefaultLineWrapper,
  WordWrapper = DefaultWordWrapper,
  LetterWrapper = DefaultLetterWrapper,
  extraProps,
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
          <LineWrapper key={i} lineIndex={i} extraProps={extraProps}>
            {words.map((word, j) => {
              const letters = (word + ' ').split('');
              return (
                <WordWrapper
                  key={j}
                  lineIndex={i}
                  wordIndex={j}
                  countIndex={wordCount++}
                  extraProps={extraProps}
                >
                  {letters.map((char, k) => (
                    <LetterWrapper
                      key={k}
                      lineIndex={i}
                      wordIndex={j}
                      letterIndex={k}
                      countIndex={letterCount++}
                      extraProps={extraProps}
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
        <WordWrapper
          key={i}
          lineIndex={0}
          wordIndex={i}
          countIndex={i}
          extraProps={extraProps}
        >
          {word}{' '}
        </WordWrapper>
      ))}
    </div>
  );
};
