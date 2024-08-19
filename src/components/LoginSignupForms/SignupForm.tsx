import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormFields = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
};

const SignupForm = () => {
  const { register, handleSubmit } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <section className="h-svh mt-10 w-svw flex flex-col justify-center align-middle items-center">
      <h1 className="mb-10 font-extrabold text-6xl">Let's get you setup!</h1>
      <form
        className="w-[45vw] p-10 border rounded-md shadow-md flex flex-wrap justify-between gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-64">
          <label htmlFor="firstName" className="text-xl">
            First Name:
          </label>
          <input
            {...register("firstName", {
              required: true,
              pattern: /^[a-zA-Z]+$/,
            })}
            type="text"
            name="firstName"
            id="firstName"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="w-64">
          <label htmlFor="lastName" className="text-xl">
            Last Name:{" "}
          </label>
          <input
            {...register("lastName", {
              required: true,
              pattern: /^[a-zA-Z]+$/,
            })}
            type="text"
            name="lastName"
            id="lastName"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="w-64">
          <label htmlFor="username" className="text-xl">
            Username:{" "}
          </label>
          <input
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 16,
            })}
            type="text"
            name="username"
            id="username"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="w-64">
          <label htmlFor="email" className="text-xl">
            Email:{" "}
          </label>
          <input
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            name="email"
            id="email"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="w-64">
          <label htmlFor="password" className="text-xl">
            Password:{" "}
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: 3,
              maxLength: 16,
            })}
            type="password"
            name="password"
            id="password"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="w-64">
          <label htmlFor="password" className="text-xl">
            Confirm Password:{" "}
          </label>
          <input
            {...register("confirmPassword", {
              required: true,
              minLength: 3,
              maxLength: 16,
            })}
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="w-64">
          <label htmlFor="dob" className="text-xl">
            Date of birth:{" "}
          </label>
          <input
            {...register("dob", { required: true })}
            type="date"
            name="dob"
            id="dob"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex w-full gap-36">
          <button
            type="submit"
            className="border shadow-md rounded-md p-3 bg-sky-100"
          >
            Create Your Account
          </button>

          <Link to={"/login"}>
            <button className="border shadow-md rounded-md p-3 bg-sky-100">
              Already have an account?
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
