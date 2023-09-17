import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeProvider';

export interface AppBarProps {
  backgroundColor?: string;
  minHeight?: string;
  maxHeight?: string;
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
}

const StyledAppBar = styled.div<AppBarProps>`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts?.body} || inherit;
  font-size: ${({ theme }) => theme.fontSizes?.body} || 1em;
  font-weight: ${({ theme }) => theme.fontWeights?.body} || 500;
  display: flex;
  flex-direction: row;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.secondary};
  min-height: ${({ minHeight }) => minHeight || '60px'};
  max-height: ${({ maxHeight }) => maxHeight || '80px'};
  border-top: ${({ borderSize, borderColor, theme }) =>
    `${borderSize || '1px'} solid ${borderColor || theme.colors.border}`};
  border-bottom: ${({ borderSize, borderColor, theme }) =>
    `${borderSize || '1px'} solid ${borderColor || theme.colors.border}`};
  box-shadow: ${({ borderShadow }) => borderShadow || 'none'};
  justify-content: ${({ alignContent }) => alignContent || 'space-between'};
  min-width: 100vw;
  min-height: 32px;
  align-items: center;
`;

const AppBar: React.FC<AppBarProps> = ({
  backgroundColor,
  minHeight,
  maxHeight,
  borderColor,
  borderShadow,
  borderSize,
  children,
  alignContent = 'left',
}) => {
  const { theme } = useTheme();

  return (
    <StyledAppBar
      backgroundColor={backgroundColor}
      minHeight={minHeight}
      maxHeight={maxHeight}
      borderColor={borderColor}
      borderShadow={borderShadow}
      borderSize={borderSize}
      theme={theme}
      alignContent={alignContent}
    >
      {children}
    </StyledAppBar>
  );
};

export default AppBar;
