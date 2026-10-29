type MainContainerProps = {
  children: React.ReactNode;
  className?: string;
};

type MainContainerPropsAndAttr = MainContainerProps & React.HTMLAttributes<HTMLDivElement>;

const MainContainer = (props: MainContainerPropsAndAttr) => {
  const { children, className, ...otherProps } = props;

  return (
    <div
      className={`${className || ""}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default MainContainer;