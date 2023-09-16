import React from "react";
import styled from "styled-components";
import { useTheme } from "../theme/ThemeProvider"; // Import your theme provider

export interface ButtonProps {
  backgroundColor?: string;
  textColor?: string;
  outlineColor?: string;
  square?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  size?: "xxs" | "s" | "m" | "l" | "xl" | "xxl";
  width?: string;
  height?: string;
  flat?: boolean;
  children: any;
}
const borderThickness = "3px";
const StyledButton = styled.button<ButtonProps>`
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.primary};
  color: ${({ textColor, theme }) => textColor || theme.colors.text};
  border: ${({ outlineColor, flat, theme }) => {
    return flat
      ? "none"
      : outlineColor
      ? `${borderThickness} solid ${outlineColor}`
      : `${borderThickness} solid ${theme.colors.border}`;
  }};
  border-radius: ${({ square, rounded }) =>
    square ? "0" : rounded ? "50px" : "4px"};
  padding: ${({ size }) => {
    switch (size) {
      case "xxs":
        return "4px 8px";
      case "s":
        return "8px 16px";
      case "m":
        return "12px 24px";
      case "l":
        return "16px 32px";
      case "xl":
        return "20px 40px";
      case "xxl":
        return "24px 48px";
      default:
        return "12px 24px";
    }
  }};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: ${({ backgroundColor, theme }) =>
      backgroundColor || theme.colors.secondary};
  }

  &:active {
    border: ${({ outlineColor, theme }) =>
      outlineColor
        ? `${borderThickness} solid ${outlineColor}`
        : `${borderThickness} solid ${theme.colors.border}`};
  }

  &:focus {
    border: ${({ outlineColor }) =>
      outlineColor ? `${borderThickness} solid ${outlineColor}` : `${borderThickness} solid transparent`};
    outline: none; // Remove the default focus outline
  }
`;

const Button: React.FC<ButtonProps> = ({
  backgroundColor,
  textColor,
  outlineColor,
  square,
  rounded,
  disabled,
  onClick,
  size,
  width,
  height,
  flat,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      outlineColor={outlineColor}
      square={square}
      rounded={rounded}
      disabled={disabled}
      onClick={onClick}
      size={size}
      width={width}
      height={height}
      flat={flat}
      theme={theme}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
