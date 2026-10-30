type ButtonProps = {
    mode?: "primary" | "secondary" | "warning";
}

type ButtonPropsAndAttr = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonPropsAndAttr) => {
  const { mode = "primary", children, onClick, disabled, className, ...otherProps } = props;

  const modeClassName = mode === "primary"
    ? "bg-blue-500 text-white hover:bg-blue-600"
    : mode === "secondary"
      ? "bg-gray-500 text-white hover:bg-gray-600"
      : mode === "warning"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "";

  const combinedClassName = `px-4 py-2 rounded ${modeClassName} ${className || ""}`;

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;