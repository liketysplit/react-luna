import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from '../Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
const TestButton = (props: ButtonProps) => (
  <ThemeProvider>
    <Button {...props} />
  </ThemeProvider>
);

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<TestButton>Click me</TestButton>);

    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('handles a click event', () => {
    const mockOnClick = jest.fn();
    render(<TestButton onClick={mockOnClick}>Click me</TestButton>);

    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
