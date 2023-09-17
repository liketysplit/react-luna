import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeProvider';

interface TopBarProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

const StyledTopBar = styled.header<TopBarProps>`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts?.heading} || inherit;
  font-size: ${({ theme }) => theme.fontSizes?.heading} || 1.5em;
  font-weight: ${({ theme }) => theme.fontWeights?.heading} || 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100px;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.primary};
`;

const TopBar: React.FC<TopBarProps> = ({ backgroundColor, children }) => {
  const { theme } = useTheme();

  return (
    <StyledTopBar backgroundColor={backgroundColor} theme={theme}>
      {children}
    </StyledTopBar>
  );
};

export default TopBar;
