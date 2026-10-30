import ErrorMessage from "@/components/ui/atoms/error-message/ErrorMessage";

type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register?: any;
  error?: string;
};

type TextInputPropsAndAttr = TextInputProps & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = (prop: TextInputPropsAndAttr) => {

    const { label, name, type = "text", placeholder, register, error, ...otherProps } = prop;

    return (
        <div className="flex flex-col gap-1 mb-4">
            <label htmlFor={name} className="font-semibold">{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                {...(error && { 'aria-invalid': true, 'aria-describedby': `${name}-error` })}
                {...otherProps}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {error && <ErrorMessage id={`${name}-error`} message={error} />}
        </div>
    );
}

export default TextInput;