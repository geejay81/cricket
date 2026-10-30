type ErrorMessageProps = {
  id: string;
  message: string;
};

const ErrorMessage = (props: ErrorMessageProps) => {
  const { id, message } = props;
  return (
    <div id={id} className="text-sm text-red-500">
      {message}
    </div>
  );
};

export default ErrorMessage;