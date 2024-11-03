import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef(({ type = "text", required = false, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="border-[1px] border-gray-300 shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-3 text-md w-full bg-transparent duration-200"
      type={type ?? "text"}
      required={required}
      {...rest}
    />
  );
});

export default Input;
