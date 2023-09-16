export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    // Add more theme variables here
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: "#4281A4",
    secondary: "#48A9A6",
    background: "#E4DFDA",
    text: "#1B2021",
    border: "#2A2B2A",
  },
};

export const darkTheme = {
  colors: {
    primary: "#56A3A6", // Adjusted for better visibility
    secondary: "#61C0BF", // Adjusted for better visibility
    background: "#1B2021", // Dark background
    text: "#E4DFDA", // Light text for contrast
    border: "#2A2B2A", // Slightly darker border color
  },
};
