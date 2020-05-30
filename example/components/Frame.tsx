import React, { useState } from 'react';

export interface FrameProps {
  title: string;
  bg: string;
  color: string;
}

export const Frame: React.FC<FrameProps> = ({ children, bg, color, title }) => {
  const [reload, setReload] = useState(0);
  return (
    <div
      key={reload}
      style={{ backgroundColor: bg, color }}
      className="frame"
      onClick={() => setReload(v => v + 1)}
    >
      {children}
      <span className="frame-title" style={{ color }}>
        {title}
      </span>
    </div>
  );
};
