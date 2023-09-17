import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeProvider';

interface FooterProps {
  backgroundColor?: string;
  minWidth?: string;
  minHeight?: string;
  children: React.ReactNode;
}

const StyledFooter = styled.div<FooterProps>`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts?.body} || inherit;
  font-size: ${({ theme }) => theme.fontSizes?.body} || 1em;
  font-weight: ${({ theme }) => theme.fontWeights?.body} || 500;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: ${({ theme }) => `1px solid ${theme.colors.border}`};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.secondary};
  min-width: '100vw';
  min-height: ${({ minHeight }) => minHeight || '100px'};
`;

const Footer: React.FC<FooterProps> = ({
  backgroundColor,
  minWidth,
  minHeight,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <StyledFooter
      backgroundColor={backgroundColor}
      minWidth={minWidth}
      minHeight={minHeight}
      theme={theme}
    >
      {children}
    </StyledFooter>
  );
};

export default Footer;
