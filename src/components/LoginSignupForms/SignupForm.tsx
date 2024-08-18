const SignupForm = () => {
  return (
    <div className="login-box">
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>login</button>
          <p className="message">
            SIGNUP TEST? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
