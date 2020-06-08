import * as React from 'react';
import { mount } from 'enzyme';
import {
  SplitText,
  LineWrapper,
  WordWrapper,
  LetterWrapper,
} from '../src/index';

describe('SplitText', () => {
  it('only accept text children', () => {
    expect(() =>
      mount(
        <SplitText>
          <div>foo</div>
        </SplitText>
      )
    ).toThrow();

    expect(() => mount(<SplitText>foo</SplitText>)).not.toThrow();
  });

  it('support computed text', () => {
    expect(() => mount(<SplitText>foo {5}</SplitText>)).not.toThrow();
    expect(
      mount(<SplitText>foo {5}</SplitText>)
        .text()
        .match('foo 5')
    ).toBeTruthy();
  });

  it('remake lines when children change', () => {
    const Component: React.FC = () => {
      const [nbr, setNbr] = React.useState(0);
      return (
        <div onClick={() => setNbr(v => v + 1)} className="component">
          <SplitText style={{ width: '1000px' }}>
            {nbr === 0 ? 'render #1' : 'render #2'}
          </SplitText>
        </div>
      );
    };

    const wrapper = mount(<Component />);
    const container = wrapper.find('.component');

    expect(container.text()).toBe('render #1');
    container.simulate('click');
    expect(container.text()).toBe('render #2');
  });

  it('ref is forwarded', () => {
    const Component: React.FC = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      setTimeout(() => {
        expect(ref.current).not.toBeNull();
        expect(ref.current).toBeInstanceOf(HTMLElement);
      }, 500);
      return <SplitText ref={ref}>Hello World</SplitText>;
    };

    mount(<Component />);
  });
});
