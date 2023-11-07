import { useState } from 'react';
import './App.css';
import ThemeExampleUse from './theme/ThemeExampleUse';
import AppLayout from './layout/AppLayout';
import AppBar from './layout/AppBar';
import MenuBar from './layout/MenuBar';
import TopBar from './layout/TopBar';
import Footer from './layout/Footer';
import Button from './ux/Button';
import ColorHelper from './_helpers/color/ColorHelper';
function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <AppLayout
        appBar={
          <AppBar>
            <Button size="xxs" onClick={() => setShowMenu(!showMenu)}>
              menu
            </Button>
            <ThemeExampleUse />
          </AppBar>
        }
        leftBar={
          <MenuBar left collapse={!showMenu}>
            Left Bar Content
          </MenuBar>
        }
        rightBar={<MenuBar right>Right Bar Content</MenuBar>}
        header={<TopBar>Header Content</TopBar>}
        footer={<Footer>Footer Content</Footer>}
      >
        <div>
          <ColorHelper />
        </div>
      </AppLayout>
    </>
  );
}

export default App;
