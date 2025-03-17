import { PropsWithChildren, MouseEvent } from "react";
import { tv } from "tailwind-variants";

type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'small' | 'medium' | 'large';

const button = tv({
  base: "rounded-md text-white transition-colors duration-200 cursor-pointer",
  variants: {
    variant: {
      primary: "bg-blue-500 hover:bg-blue-700",
      secondary: "bg-gray-500 hover:bg-gray-700",
      success: "bg-green-500 hover:bg-green-700",
      warning: "bg-yellow-500 hover:bg-yellow-700",
      danger: "bg-red-500 hover:bg-red-700",
    },
    size: {
      small: "px-1 py-1 text-sm",
      medium: "px-1 py-1 text-base",
      large: "px-1 py-1 text-lg",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
    disabled: false,
  },
});

export function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
}: PropsWithChildren<{
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>) {
  return (
    <button
      className={button({ variant, size, disabled })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;