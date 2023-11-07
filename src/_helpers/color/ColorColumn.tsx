import React from 'react';
import ColorCopy from './ColorCopy';

function ColorColumn({ colors }: { colors: string[] }) {
  //   console.log("ColorColumn", colors);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
      {colors.map((color, index) => (
        <>
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: '100px',
              height: '50px',
              margin: '2px',
              display: 'flex',
              borderRadius: '5px',
              border: '2px solid transparent',
            }}
          />
          <ColorCopy colorInput={color} />
        </>
      ))}
    </div>
  );
}

export default ColorColumn;
