const GetUserDetailsButton = ({ getUserDetails }: any) => {
  return (
    <button type="submit" onClick={getUserDetails}>
      Get your details bro.
    </button>
  );
};

export default GetUserDetailsButton;
