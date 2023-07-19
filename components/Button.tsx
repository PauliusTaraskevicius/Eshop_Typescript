import { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: (e: any) => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-base flex justify-center items-center leading-none py-4  lg:py-6 rounded-full mt-5 md:mt-[50px]
        ${fullWidth ? "w-full" : "w-fit"}
        ${
          secondary
            ? "bg-purple-700 w-[20%]  hover:bg-gray-200 transition ease-in"
            : "bg-sky-500"
        }
        ${secondary ? "text-white hover:text-black " : "text-white"}
        ${secondary ? "border-black" : "border-sky-500"}
        ${large ? "text-sm md:text-base whitespace-nowrap" : "text-md"}
        ${large ? "px-4 w-10/12" : "px-4"}
        ${large ? "py-3" : "py-2"}
        ${outline ? "bg-transparent" : ""}
        ${outline ? "border-white" : ""}
        ${outline ? "text-white" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
