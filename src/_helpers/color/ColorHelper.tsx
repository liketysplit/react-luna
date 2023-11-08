import React, { useState } from 'react';
import ColorColumn from './ColorColumn';
import tinycolor from 'tinycolor2';
import Code from './Code';

const ColorHelper = () => {
  const numShades = 9;

  const getColorShades = (baseColor: string) => {
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

  const getGrayscaleShades = (baseColor: string) => {
    const colorShades = [];
    const baseColorHSL = tinycolor(baseColor).toHsl();
    const numShades = 9;

    // Find the minimum lightness of the input shade
    const inputShadeLuminance = tinycolor(baseColor).getLuminance();
    const minLightness = 100 - inputShadeLuminance * 66 * 0.2;

    for (let i = 1; i <= numShades; i++) {
      let l = minLightness - i * 10; // Adjust lightness based on the minimum lightness

      // Ensure the lightness doesn't go below 0
      if (l < 0) {
        l = 0;
      }

      const shade = `hsl(${baseColorHSL.h}, ${baseColorHSL.s}%, ${l}%)`;
      colorShades.push(shade);
    }

    return colorShades;
  };

  // Define an object to hold colors, color names, and their shades
  const [colorData, setColorData] = useState([
    {
      color: '#513399',
      name: 'primary',
      shades: getColorShades('#513399'),
      greyScale: false,
    },
    {
      color: '#663399',
      name: 'secondary',
      shades: getColorShades('#663399'),
      greyScale: false,
    },
    {
      color: '#a8a4a4',
      name: 'outline-light',
      shades: getGrayscaleShades('#a8a4a4'),
      greyScale: true,
    },
    {
      color: '#524747',
      name: 'outline-dark',
      shades: getGrayscaleShades('#524747'),
      greyScale: true,
    },
    {
      color: '#0fdb27',
      name: 'success',
      shades: getColorShades('#0fdb27'),
      greyScale: false,
    },
    {
      color: '#264de8',
      name: 'info',
      shades: getColorShades('#264de8'),
      greyScale: false,
    },
    {
      color: '#f01919',
      name: 'error',
      shades: getColorShades('#f01919'),
      greyScale: false,
    },
    {
      color: '#e0c71f',
      name: 'warning',
      shades: getColorShades('#e0c71f'),
      greyScale: false,
    },
  ]);

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedColorData = [...colorData];
    updatedColorData[index].color = event.target.value;
    const shades = !updatedColorData[index].greyScale
      ? getColorShades(updatedColorData[index].color)
      : getGrayscaleShades(updatedColorData[index].color);
    updatedColorData[index].shades = shades;
    setColorData(updatedColorData);
  };

  const addColumn = () => {
    const baseColor = '#ff0000';
    const colorShades = getColorShades(baseColor);
    const updatedColorData = [...colorData];
    updatedColorData.push({
      color: baseColor,
      name: 'color',
      shades: colorShades,
      greyScale: false,
    });
    setColorData(updatedColorData);
  };

  const deleteColumn = (index: number) => {
    const updatedColorData = [...colorData];
    updatedColorData.splice(index, 1);
    setColorData(updatedColorData);
  };

  const generateColorShadesCss = () => {
    let css = '';
    for (let i = 0; i < colorData.length; i++) {
      const colorItem = colorData[i];
      for (let j = 0; j < colorItem.shades.length; j++) {
        const color = colorItem.shades[j];
        css += `    --color-${colorItem.name}-${(j + 1) * 100}: ${tinycolor(
          color,
        ).toHexString()}\n`;
      }
    }
    return `:root {\n${css}\n}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
        {colorData.map((colorItem, index) => (
          <div
            key={index}
            style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}
          >
            <input
              type="color"
              value={colorItem.color}
              onChange={(e) => handleColorChange(e, index)}
              style={{ marginLeft: '12px', width: '105px' }}
            />
            <input
              type="text"
              value={colorItem.name}
              onChange={(e) => {
                const updatedColorData = [...colorData];
                updatedColorData[index].name = e.target.value;
                setColorData(updatedColorData);
              }}
              style={{ marginLeft: '12px', width: '98px' }}
            />
            <button
              onClick={() => deleteColumn(index)}
              style={{ marginLeft: '12px', width: '105px' }}
            >
              Remove Color
            </button>
            <ColorColumn colors={colorItem.shades} />
          </div>
        ))}
        <button onClick={addColumn}>Add Color</button>
      </div>
      <Code value={generateColorShadesCss()} />
    </div>
  );
};

export default ColorHelper;
