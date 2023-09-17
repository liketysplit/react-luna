export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    borderSize?: string;
  };
  fonts?: {
    body: string;
    heading: string;
  };
  fontSizes?: {
    body: string;
    heading: string;
  };
  fontWeights?: {
    body: number;
    heading: number;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#4281A4',
    secondary: '#48A9A6',
    background: '#E4DFDA',
    text: '#1B2021',
    border: '#2A2B2A',
    borderSize: '3px',
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  fontSizes: {
    body: '2rem',
    heading: '2rem',
  },
  fontWeights: {
    body: 400,
    heading: 700,
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
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  fontSizes: {
    body: '1rem',
    heading: '2rem',
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
};
