
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-quiz-primary hover:bg-opacity-90 text-white",
    secondary: "bg-quiz-secondary hover:bg-opacity-90 text-white",
    outline: "bg-transparent border-2 border-quiz-primary text-quiz-primary hover:bg-quiz-light",
    ghost: "bg-transparent hover:bg-quiz-light text-quiz-primary",
  };

  const sizeClasses = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
  };

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        iconPosition === "right" ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      {icon && <span className={cn(size === "sm" ? "text-base" : "text-xl")}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
