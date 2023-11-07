import React, { useEffect, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
const ColorPicker = ({ colorInput }: { colorInput: string }) => {
  const [color, setColor] = useState('#FFFFFF');
  const ref = useRef<HTMLInputElement>(null);
  const handleCopyClick = () => {
    const input = ref.current;
    if (!input) return;

    input.select();
    document.execCommand('copy');
  };

  useEffect(() => {
    setColor(colorInput);
  }, [colorInput]);

  const sizeStyle = {
    margin: '0px',
    padding: '0px',
    display: 'flex',
    borderRadius: '1px',
    border: '1px solid grey',
    alignContent: 'middle',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2px' }}>
      <input
        ref={ref}
        id="colorInput"
        type="text"
        value={tinycolor(color).toHexString()}
        readOnly
        style={{
          ...sizeStyle,
          width: '80px',
          height: '25px',
          borderRight: 'none', // Remove right border
        }}
      />
      <button
        onClick={handleCopyClick}
        style={{
          ...sizeStyle,
          borderLeft: 'none', // Remove left border
          backgroundColor: '#f0f0f0',
          cursor: 'pointer',
          width: '20px',
          height: '27px',
        }}
      >
        📋
      </button>
    </div>
  );
};

export default ColorPicker;
