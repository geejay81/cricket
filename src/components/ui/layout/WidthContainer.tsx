
type WidthContainerProps = {
};

type WidthContainerPropsAndAttr = WidthContainerProps & React.HTMLAttributes<HTMLDivElement>;

const WidthContainer = (props: WidthContainerPropsAndAttr) => {
  const { children, className, ...otherProps } = props;

  return (
    <div
      className={`min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || ""}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default WidthContainer;