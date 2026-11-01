type ButtonProps = {
    variant?: "primary" | "secondary" | "warning";
}

type ButtonPropsAndAttr = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonPropsAndAttr) => {
  const { variant = "primary", children, onClick, disabled, className, ...otherProps } = props;

  let modeClassName: string;
  switch(variant) {
    case "secondary":
      modeClassName = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "warning":
      modeClassName = "bg-red-500 text-white hover:bg-red-600";
      break;
    default:
      modeClassName = "bg-blue-500 text-white hover:bg-blue-600";
  };

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