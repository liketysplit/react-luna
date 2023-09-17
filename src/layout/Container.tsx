import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeProvider';

interface ContainerProps {
  flexGrow?: number;
  padding?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const StyledContainer = styled.main<ContainerProps>`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts?.body} || inherit;
  font-size: ${({ theme }) => theme.fontSizes?.body} || 1em;
  font-weight: ${({ theme }) => theme.fontWeights?.body} || 500;
  flex-grow: ${({ flexGrow }) => flexGrow || 1};
  padding: ${({ padding }) => padding || '1rem 2rem 2rem 2rem'};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ||
    theme.colors.background}; // Use theme color or the passed prop
  /* Add other styles as needed */
`;

const Container: React.FC<ContainerProps> = ({
  flexGrow,
  padding,
  backgroundColor,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <StyledContainer
      flexGrow={flexGrow}
      padding={padding}
      backgroundColor={backgroundColor}
      theme={theme}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
