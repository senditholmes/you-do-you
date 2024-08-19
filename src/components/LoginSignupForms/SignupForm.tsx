import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

// HELPERS
function passwordsMatch(values: { password: string; confirmPassword: string }) {
  return values.password === values.confirmPassword;
}

// SCHEMA
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .max(20, { message: "Password must be maximum 20 characters." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Please include an upper case character.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Please include a lowercase character.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Please include a number.",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Please include at least one special character",
  });

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

type FormFields = z.infer<typeof schema>;

// COMPONENT
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "Example123@gmail.com",
      username: "Example",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
        console.log(data);
      });
      throw new Error();
    } catch (error) {
      setError("root", { message: "Sorry, something went wrong." });
    }
  };
  return (
    <section className="h-svh mt-10 w-svw flex flex-col justify-center align-middle items-center">
      <div className="h-48 flex flex-col justify-between align-middle items-center">
        <h1 className="font-extrabold text-6xl">Let's get you setup!</h1>
        <p className="text-xl ml-1 text-red-500 p-5 mb-5">
          {errors.root?.message}
        </p>
      </div>

      <form
        className="w-[45vw] p-10 border rounded-md shadow-md flex flex-wrap justify-between gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-64 h-24">
          <label htmlFor="firstName" className="text-xl">
            First Name:
          </label>
          <input
            {...register("firstName")}
            type="text"
            name="firstName"
            id="firstName"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.firstName && (
            <p className="text-xs ml-1 text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="w-64 h-24">
          <label htmlFor="lastName" className="text-xl">
            Last Name:{" "}
          </label>
          <input
            {...register("lastName")}
            type="text"
            name="lastName"
            id="lastName"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.lastName && (
            <p className="text-xs ml-1 text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="w-64 h-24">
          <label htmlFor="username" className="text-xl">
            Username:{" "}
          </label>
          <input
            {...register("username")}
            type="text"
            name="username"
            id="username"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.username && (
            <p className="text-xs ml-1 text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="w-64 h-24">
          <label htmlFor="email" className="text-xl">
            Email:{" "}
          </label>
          <input
            {...register("email", {
              required: "Please enter your email.",
            })}
            name="email"
            id="email"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.email && (
            <p className="text-xs ml-1 text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="w-64 h-24">
          <label htmlFor="password" className="text-xl">
            Password:{" "}
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.password && (
            <p className="text-xs ml-1 text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="w-64 h-24">
          <label htmlFor="password" className="text-xl">
            Confirm Password:{" "}
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
          {errors.confirmPassword && (
            <p className="text-xs ml-1 text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex w-full gap-36">
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
