import React, { useState } from 'react';

export interface FrameProps {
  bg: string;
  color: string;
}

export const Frame: React.FC<FrameProps> = ({ children, bg, color }) => {
  const [reload, setReload] = useState(0);
  return (
    <div
      key={reload}
      style={{ backgroundColor: bg, color }}
      className="frame"
      onClick={() => setReload(v => v + 1)}
    >
      {children}
    </div>
  );
};
