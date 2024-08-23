import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../InputField/InputField";
import { loginInFormInputs } from "./loginInFormInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import generatePasswordSchema from "../../../helpers/generatePasswordSchema";

// /////////////////////////////////////////////////////////////////// SCHEMA //////////////////////////////////////////////////////////////////////////

const passwordSchema = generatePasswordSchema();
const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be more than 3 characters." })
    .max(15, { message: "Username must be less than 15 characters." }),
  password: passwordSchema,
});

type LoginFormFields = z.infer<typeof loginSchema>;

/////////////////////////////////////////////////////////////////// HOOKS AND STATE /////////////////////////////////////////////////////////////////////

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: {
      username: "Example",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (formData) => {
    setError("root", { message: "Testing Error Message" });
    console.log(formData);
  };

  /////////////////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////////////////////

  return (
    <section className="h-[650px] flex justify-evenly align-middle items-center">
      <div className="h-40 flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-6xl">Welcome back!</h1>
      </div>
      <form
        className="w-[45vw] p-10 border rounded-md shadow-md flex flex-wrap justify-between gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {loginInFormInputs.map((input) => {
          return (
            <InputField
              key={input.id}
              labelContent={input.labelContent}
              type={input.type}
              id={input.id}
              name={input.name}
              register={register}
              errors={errors}
            />
          );
        })}

        {/* // BUTTONS */}
        <div id="buttons" className="flex w-full gap-36">
          <button
            type="submit"
            className="border shadow-md rounded-md bg-sky-100 w-64 p-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>

          <Link to={"/signup"}>
            <button
              className="border shadow-md rounded-md bg-sky-100 w-64 p-3"
              disabled={isSubmitting}
            >
              Don't have an account?
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
