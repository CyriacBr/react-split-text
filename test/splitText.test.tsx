import * as React from 'react';
import { mount } from 'enzyme';
import { SplitText } from '../src/index';

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
  });

  it('remake lines when children change', () => {
    const Component: React.FC = () => {
      const [nbr, setNbr] = React.useState(0);
      return (
        <div onClick={() => setNbr(v => v + 1)} className="component">
          <SplitText>{nbr === 0 ? 'render #1' : 'render #2'}</SplitText>
        </div>
      );
    };

    const wrapper = mount(<Component />);
    const container = wrapper.find('.component');

    expect(container.text().trim()).toBe('render #1');
    container.simulate('click');
    expect(container.text().trim()).toBe('render #2');
  });
});
