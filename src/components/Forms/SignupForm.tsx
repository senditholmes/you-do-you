import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { passwordsMatch } from "../../helpers/passwordMatch";
import { requestServerAction } from "../../helpers/API";
import { signInFormInputs } from "../../utils/signUpFormInputs";
import generatePasswordSchema from "../../helpers/generatePasswordSchema";

import InputField from "../InputField";

const URL = "http://localhost:3000/signup";

// /////////////////////////////////////////////////////////////////// SCHEMA //////////////////////////////////////////////////////////////////////////

const passwordSchema = generatePasswordSchema();
const schema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Please enter you name." })
      .regex(/^[A-Za-z]+$/, {
        message: "First name can only contain letters.",
      }),
    lastName: z
      .string()
      .min(1, { message: "Please enter your name." })
      .regex(/^[A-Za-z]+$/, {
        message: "Last name can only contain letters.",
      }),
    username: z
      .string()
      .min(3, { message: "Username must be more than 3 characters." })
      .max(15, { message: "Username must be less than 15 characters." }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine(passwordsMatch, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export type SignUpFormFields = z.infer<typeof schema>;

/////////////////////////////////////////////////////////////////// HOOKS AND STATE /////////////////////////////////////////////////////////////////////

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "Example123@gmail.com",
      username: "Example",
    },
    resolver: zodResolver(schema),
  });

  /////////////////////////////////////////////////////////////////// SERVER ACTIONS /////////////////////////////////////////////////////////////////////

  const onSubmit: SubmitHandler<SignUpFormFields> = async (formData) => {
    try {
      const insertRequestResponse = await requestServerAction(formData, URL);

      if (insertRequestResponse.status === 200) {
        toast.success(
          "User successfully registered. Let's get you logged in...",
          { duration: 5000 }
        );
        navigate(`/login`, { replace: true });
      } else if (insertRequestResponse.status != 200) {
        toast.error("Username or email already registered!", {
          duration: 5000,
        });
        return;
      }
    } catch (error) {
      // TODO redirect to failure page
      setError("root", { message: `${error}` });
    }
  };

  /////////////////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////////////////////

  return (
    <section className="h-svh[80] w-svw flex flex-col justify-between gap-3 align-middle items-center">
      <div className="h-40 flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-6xl">Let's get you setup!</h1>
      </div>

      <form
        className="w-[45vw] p-10 border rounded-md shadow-md flex flex-wrap justify-between gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {signInFormInputs.map((input) => {
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
            {isSubmitting ? "Loading..." : "Create Your Account"}
          </button>

          <Link to={"/login"}>
            <button
              className="border shadow-md rounded-md bg-sky-100 w-64 p-3"
              disabled={isSubmitting}
            >
              Already have an account?
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
