import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputProps {
  name: string;
  id: string;
  labelContent: string;
  type: string;
  register: UseFormRegister<any>;
  errors: any; // TO DO FIND OUT WHAT FUCKING TYPE THIS IS!?
}

const Input = ({
  name,
  labelContent,
  type,
  id,
  register,
  errors,
}: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-64 h-24 relative">
      <label htmlFor={name} className="text-xl">
        {labelContent}
      </label>

      {type === "password" && (
        <div
          className="absolute left-56 bottom-[38px] cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}

      <input
        type={type === "password" && isPasswordVisible ? "text" : type} // Toggles between "text" and "password"
        id={id}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        {...register(name)}
      />

      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
