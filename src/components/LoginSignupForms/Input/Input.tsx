import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  name: string;
  id: string;
  labelContent: string;
  type: string;
  register: UseFormRegister<any>;
  errors: any; // TO DO- FIND OUT WHAT FUCKING TYPE THIS IS!?
}

const Input = ({
  name,
  labelContent,
  type,
  id,
  register,
  errors,
}: FormInputProps) => {
  return (
    <div className="w-64 h-24">
      <label htmlFor={name} className="text-xl">
        {labelContent}
      </label>
      <input
        type={type}
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
