export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#4281A4',
    secondary: '#48A9A6',
    background: '#E4DFDA',
    text: '#1B2021',
    border: '#2A2B2A',
  },
};

export const darkTheme = {
  colors: {
    primary: '#56A3A6',
    secondary: '#61C0BF',
    background: '#1B2021',
    text: '#E4DFDA',
    border: '#2A2B2A',
  },
};
