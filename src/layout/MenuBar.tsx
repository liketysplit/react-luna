import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeProvider';
import Container from './Container';

export interface MenuBarProps {
  backgroundColor?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  borderColor?: string;
  borderShadow?: string;
  borderSize?: string;
  children: React.ReactNode;
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'left'
    | 'right';
  left?: boolean;
  right?: boolean;
  collapse?: boolean;
}
const defaultWidth = '200px';
const defaultMinWidth = '32px';
const StyledMenuBar = styled.div<MenuBarProps>`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts?.body} || inherit;
  font-size: ${({ theme }) => theme.fontSizes?.body} || 1em;
  font-weight: ${({ theme }) => theme.fontWeights?.body} || 500;
  display: flex;
  flex-direction: column;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.background};
  min-width: ${({ minWidth }) => minWidth || '32px'};
  max-width: ${({ maxWidth, collapse }) =>
    collapse ? defaultMinWidth : maxWidth || defaultWidth};
  width: ${({ width, collapse }) =>
    collapse ? defaultMinWidth : width || 'auto'};
  border-left: ${({ borderSize, borderColor, theme, left }) =>
    left
      ? 'none'
      : `${borderSize || '1px'} solid ${borderColor || theme.colors.border}`};
  border-right: ${({ borderSize, borderColor, right, theme }) =>
    right
      ? 'none'
      : `${borderSize || '1px'} solid ${borderColor || theme.colors.border}`};
  box-shadow: ${({ borderShadow }) => borderShadow || 'none'};
  justify-content: ${({ alignContent }) => alignContent || 'space-between'};
  flex: 0 0 25%;
  min-height: 100vh;
  overflow: hidden;
`;

const MenuBar: React.FC<MenuBarProps> = ({
  backgroundColor,
  minWidth,
  maxWidth,
  borderColor,
  borderShadow,
  borderSize,
  children,
  alignContent,
  left,
  right,
  collapse = false,
}) => {
  const { theme } = useTheme();

  return (
    <StyledMenuBar
      backgroundColor={backgroundColor}
      minWidth={minWidth}
      maxWidth={maxWidth}
      borderColor={borderColor}
      borderShadow={borderShadow}
      borderSize={borderSize}
      theme={theme}
      alignContent={alignContent}
      left={left}
      right={right}
      collapse={collapse}
    >
      <Container padding=".5rem">{children}</Container>
    </StyledMenuBar>
  );
};

export default MenuBar;
