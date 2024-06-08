import "./App.css";
import "./components/TodoView/todoView.css";
import "./assets/style/sign.css";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import SendEmail from "./components/Pages/SendEmail";
import ForgotPassword from "./components/Pages/ForgotPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import { isUserLoggedIn } from "./api/authUtility";

function AuthenticatedRoute({ children }: any) {
  const isAuth = isUserLoggedIn();
  if (isAuth) {
    return children;
  }
  return <Navigate to="/signin" />;
}
function App() {
  const isAuth = isUserLoggedIn();

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sendEmail" element={<SendEmail />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
