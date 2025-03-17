import { tv } from "tailwind-variants";
import { InputHTMLAttributes } from "react";

const textField = tv({
  base: "w-full px-3 py-2 border rounded-md outline-none transition",
  variants: {
    variant: {
      primary: "border-blue-500 focus:ring-2 focus:ring-blue-300",
      secondary: "border-gray-500 focus:ring-2 focus:ring-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary";
}

export function TextField({ variant, size, ...props }: TextFieldProps) {
  return <input className={textField({ variant })} {...props} />;
}

export default TextField;
