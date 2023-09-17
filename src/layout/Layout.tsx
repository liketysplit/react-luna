import React from 'react';
import styled from 'styled-components';

interface FlexProps {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  grow?: number;
  children: React.ReactNode;
}

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  flex-grow: ${({ grow }) => grow || 0};
  overflow: wrap-inline;
  ${({ direction }) =>
    direction === 'row' ? 'min-height: 100vh;' : 'min-width: 100vw;'}
`;

export const Row: React.FC<FlexProps> = ({
  direction = 'row',
  align,
  justify,
  grow,
  children,
}) => {
  return (
    <FlexContainer
      direction={direction}
      align={align}
      justify={justify}
      grow={grow}
    >
      {children}
    </FlexContainer>
  );
};

export const Column: React.FC<FlexProps> = ({
  direction = 'column',
  align,
  justify,
  grow,
  children,
}) => {
  return (
    <FlexContainer
      direction={direction}
      align={align}
      justify={justify}
      grow={grow}
    >
      {children}
    </FlexContainer>
  );
};
