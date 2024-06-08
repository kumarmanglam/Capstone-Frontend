import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendResetLink } from "../../../api/passwordService";
import { BeatLoader } from "react-spinners";

type FormData = {
  email: string;
};
const SendEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();
  const emailData = {
    email: "",
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await sendResetLink(formData.email);
      setLoading(false);
      setFormData({ email: "" });
      alert("Sent Password reset link");
    } catch (error) {
      setLoading(false);
      alert("Failed to send Email");
    }
  };
  const cssOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
    backgroundColor: "#008DDA",
  };
  const [formData, setFormData] = useState<FormData>(emailData);
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
                type="text"
                placeholder="Email"
                className="formInput"
                value={formData?.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
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
                <span>Send Reset Email</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
