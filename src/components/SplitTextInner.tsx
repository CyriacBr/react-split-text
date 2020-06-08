import React, {
  useRef,
  useLayoutEffect,
  useState,
  memo,
  FC,
  forwardRef,
  MutableRefObject,
} from 'react';
import { LineWrapper, WordWrapper, LetterWrapper } from './Wrappers';
import { SplitTextProps } from './SplitText';

const DefaultLineWrapper = memo(LineWrapper);
const DefaultWordWrapper = memo(WordWrapper);
const DefaultLetterWrapper = memo(LetterWrapper);

export const SplitTextInner: FC<SplitTextProps> = forwardRef(
  function SplitTextInner(
    {
      children,
      className,
      style,
      LineWrapper = DefaultLineWrapper,
      WordWrapper = DefaultWordWrapper,
      LetterWrapper = DefaultLetterWrapper,
      extraProps,
    },
    ref
  ) {
    let text = '';
    React.Children.map(children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        text += String(child);
      } else {
        throw new Error(`SplitText expect a text as children`);
      }
    });

    const elRef = useRef<HTMLDivElement | null>(null);
    const [lines, setLines] = useState<string[]>([]);
    const maxCharPerLine = useRef<number>(0);

    function makeLines() {
      const el = elRef.current;
      if (!el) return;

      if (lines.length > 0) {
        return refreshLines(lines, text);
      }

      let lastY;
      let newLines: string[] = [];
      let words: string[] = [];
      for (const child of Array.from(el.children)) {
        const y = child.getBoundingClientRect().top;
        if (lastY == null) lastY = y;
        if (y !== lastY) {
          newLines.push(words.join(' '));
          words = [];
        }
        lastY = y;
        words.push((child.textContent || '').trim());
      }
      newLines.push(words.join(' '));
      setLines(newLines);
    }

    function refreshLines(previous: string[], newText: string) {
      const charPerLine =
        maxCharPerLine.current ||
        previous.map(line => line.length).sort((a, b) => b - a)[0];
      const lines: string[] = [];
      let line: string = '';
      let charCount = 0;
      const words = newText.split(' ');
      for (const [i, word] of words.entries()) {
        charCount += word.length + 1;
        if (charCount > charPerLine + 1) {
          lines.push(line);
          line = '';
          charCount = 0;
        }
        line += word.trim() + ' ';
      }
      lines.push(line);
      setLines(lines.map(line => line.trim()));
      if (charPerLine > maxCharPerLine.current) {
        maxCharPerLine.current = charPerLine;
      }
    }

    useLayoutEffect(() => makeLines(), [text]);

    let wordCount = 0;
    let letterCount = 0;

    return lines.length ? (
      <div
        className={className}
        ref={div => {
          elRef.current = div;
          if (typeof ref == 'function') {
            ref(div);
          } else if (ref) {
            (ref as MutableRefObject<HTMLDivElement | null>).current = div;
          }
        }}
        style={style}
      >
        {lines.map((line, i) => {
          let words = line.split(' ');
          words = words.map((word, i) =>
            i === words.length - 1 ? word : word + ' '
          );
          return (
            <LineWrapper key={i} lineIndex={i} extraProps={extraProps}>
              {words.map((word, j) => {
                const letters = word.split('');
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
          <span key={i}>{word} </span>
        ))}
      </div>
    );
  }
);
