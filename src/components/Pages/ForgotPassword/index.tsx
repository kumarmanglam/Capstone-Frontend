import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../api/passwordService";
type FormData = {
  password: string;
  confirmPassword: string;
};
const ForgotPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigator = useNavigate();
  const forgotData = {
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<FormData>(forgotData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password != formData.confirmPassword) {
      alert("Password do not match");
    } else {
      if (token) {
        await resetPassword(token, formData.confirmPassword);
        alert("Password was reset sucessfully");
        navigator("/signin");
      } else {
        alert("Unable to reset password");
      }
    }
  };
  return (
    <div className="SignPage">
      <div className="formPageHead">
        ✍️ Todo App
        <button className="headBtn" onClick={() => navigator("/signin")}>
          Login
        </button>
      </div>
      <div className="pageContainer">
        <div className="formContainer">
          <form className="formCard" onSubmit={handleSubmit}>
            <div className="formGroup">
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
            <div className="formGroup">
              <input
                type="password"
                placeholder="Confirm Password"
                className="formInput"
                value={formData?.confirmPassword}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    confirmPassword: event.target.value,
                  })
                }
              />
            </div>
            <input
              className="formButton"
              type="submit"
              value="Reset Password"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
