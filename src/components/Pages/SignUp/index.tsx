import { useState } from "react";
import { registerAPICall } from "../../../api/authService";
import { useNavigate } from "react-router-dom";

export type SignUpForm = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const navigator = useNavigate();
  const signup = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formData.name.length === 0 ||
      formData.username.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0
    ) {
      alert("Fill Complete Details");
      return;
    }
    try {
      await registerAPICall(formData);
      alert("User registered successfully");
      navigator("/signin");
    } catch (error: any) {
      const errorMessage =
        error.response?.data || "User registration failed. Please try again.";
      alert(errorMessage);
    }
  };
  const [formData, setFormData] = useState<SignUpForm>(signup);
  return (
    <div className="SignPage">
      <div className="formPageHead">
        ✍️ Todo App
        <button className="headBtn" onClick={() => navigator("/signin")}>
          Login
        </button>
      </div>
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
                placeholder="Full Name"
                className="formInput"
                value={formData?.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                placeholder="Username"
                className="formInput"
                value={formData?.username}
                onChange={(event) =>
                  setFormData({ ...formData, username: event.target.value })
                }
              />
            </div>
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
            </div>
            <input className="formButton" type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
