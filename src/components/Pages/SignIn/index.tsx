import { useState } from "react";
import { loginAPICall } from "../../../api/authService";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();
  const login = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<SignInForm>(login);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await loginAPICall(formData);
      navigator("/home");
    } catch (error) {
      alert("invalid credentials");
    }
    setLoading(false);
  };
  const cssOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };
  return (
    <div className="SignPage">
      <div className="formPageHead">✍️ Todo App</div>
      <div className="pageContainer">
        <div className="signTagLine">
          <p>Open Your</p>
          <p className="signTagLineMiddle">Task manager Account</p>
          <p>Today</p>
        </div>
        <div className="formContainer">
          <form className="formCard" onSubmit={handleSubmit}>
            <div className="formGroup">
              <input
                type="text"
                placeholder="Email"
                className="formInput"
                value={formData?.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="formInput"
                value={formData?.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
              <p className="forgotMsg" onClick={() => navigator("/sendemail")}>
                Forgot Password?
              </p>
            </div>
            {/* <input className="formButton" type="submit" value="Login Now" /> */}
            <button type="submit" className="formButton">
              {loading ? (
                <BeatLoader
                  color="#fff"
                  loading={loading}
                  cssOverride={cssOverride}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span>Login Now</span>
              )}
            </button>
            <div>
              <p className="formMsg" onClick={() => navigator("/signup")}>
                Don't have an account? Signup Now!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
