import React, { ReactNode } from 'react';
import './AppLayout.css';
import Container from './Container';
import { Row, Column } from './Layout';

export interface AppLayoutProps {
  appBar?: ReactNode;
  leftBar?: ReactNode;
  rightBar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  header,
  appBar,
  leftBar,
  rightBar,
  children,
  footer,
}) => {
  return (
    <Column grow={1}>
      {header}
      {appBar}

      <Row grow={1}>
        {leftBar}
        <Container>
          <main>{children}</main>
        </Container>
        {rightBar}
      </Row>
      {footer}
    </Column>
  );
};

export default AppLayout;
