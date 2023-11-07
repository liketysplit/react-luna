import React, { useState, useEffect } from 'react';
import ColorColumn from './ColorColumn';
import tinycolor from 'tinycolor2';
import Code from './Code';

const ColorHelper = () => {
  const getColorShades = (baseColor: string) => {
    const numShades = 9;
    const colorShades = [];
    const baseColorHSL = tinycolor(baseColor).toHsl();

    for (let i = 1; i <= numShades; i++) {
      const s = i * 10; // Increment saturation in steps of 10
      const b = 90 - i * 10; // Decrement brightness in steps of 10
      const shade = `hsl(${baseColorHSL.h}, ${s}%, ${b}%)`;
      colorShades.push(shade);
    }
    return colorShades;
  };
  const [selectedColors, setSelectedColors] = useState([
    '#ffffff',
    '#ffffff',
    '#a8a4a4',
    '#524747',
    '#0fdb27',
    '#264de8',
    '#f01919',
    '#e0c71f',
  ]); // Default colors
  const [colorNames, setColorNames] = useState([
    'primary',
    'secondary',
    'outline-light',
    'outline-dark',
    'success',
    'info',
    'error',
    'warning',
  ]);
  const [colors, setColors] = useState([
    getColorShades(selectedColors[0]),
    getColorShades(selectedColors[1]),
    getColorShades(selectedColors[2]),
    getColorShades(selectedColors[3]),
    getColorShades(selectedColors[4]),
    getColorShades(selectedColors[5]),
    getColorShades(selectedColors[6]),
    getColorShades(selectedColors[7]),
  ]);

  const generateColorShades = (baseColor: string, index: number) => {
    const colorShades = getColorShades(baseColor);
    handleColorsChange(colorShades, index);
  };

  const handleColorsChange = (colorShades: string[], index: number) => {
    const colorsCopy = [...colors];
    colorsCopy[index] = colorShades;
    setColors(colorsCopy);
  };

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const colorsCopy = [...selectedColors];
    colorsCopy[index] = event.target.value;
    setSelectedColors(colorsCopy);
    generateColorShades(event.target.value, index);
  };

  useEffect(() => {
    generateColorShades(selectedColors[0], 0);
    generateColorShades(selectedColors[1], 1);
    generateColorShades(selectedColors[2], 2);
    generateColorShades(selectedColors[3], 3);
    generateColorShades(selectedColors[4], 4);
    generateColorShades(selectedColors[5], 5);
    generateColorShades(selectedColors[6], 6);
    generateColorShades(selectedColors[7], 7);
  }, []);

  const addColumn = () => {
    const baseColor = '#ff0000';
    const colorShades = getColorShades(baseColor);
    const colorsCopy = [...colors];
    const colorShadesCopy = [...colorShades];
    colorsCopy.push(colorShadesCopy);
    setColors(colorsCopy);
    const selectedColorsCopy = [...selectedColors];
    selectedColorsCopy.push(baseColor);
    setSelectedColors(selectedColorsCopy);
    const colorNamesCopy = [...colorNames];
    colorNamesCopy.push('color');
    setColorNames(colorNamesCopy);
  };

  const deleteColumn = (index: number) => {
    const colorsCopy = [...colors];
    colorsCopy.splice(index, 1);
    setColors(colorsCopy);
    const selectedColorsCopy = [...selectedColors];
    selectedColorsCopy.splice(index, 1);
    setSelectedColors(selectedColorsCopy);
    const colorNamesCopy = [...colorNames];
    colorNamesCopy.splice(index, 1);
    setColorNames(colorNamesCopy);
  };

  const generateColorShadesCss = () => {
    let css = '';
    for (let i = 0; i < selectedColors.length; i++) {
      const colorShades = colors[i];
      for (let j = 0; j < colorShades.length; j++) {
        const color = colorShades[j];

        css += `    --color-${colorNames[i]}-${(j + 1) * 100}: ${tinycolor(
          color,
        ).toHexString()}\n`;
      }
    }
    return `:root {\n${css}\n}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
        {selectedColors.map((color, index) => (
          <div
            style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}
          >
            <input
              type="color"
              value={selectedColors[index]}
              onChange={(e) => handleColorChange(e, index)}
              style={{ marginLeft: '12px', width: '105px' }}
            />
            <input
              type="text"
              value={colorNames[index]}
              onChange={(e) => {
                const colorNamesCopy = [...colorNames];
                colorNamesCopy[index] = e.target.value;
                setColorNames(colorNamesCopy);
              }}
              style={{ marginLeft: '12px', width: '98px' }}
            />
            <button
              onClick={() => deleteColumn(index)}
              style={{ marginLeft: '12px', width: '105px' }}
            >
              Remove Color
            </button>
            <ColorColumn colors={colors[index]} />
          </div>
        ))}
        <button onClick={addColumn}>Add Color</button>
      </div>
      <Code value={generateColorShadesCss()} />
    </div>
  );
};

export default ColorHelper;
