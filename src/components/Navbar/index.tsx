import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import { UserType, getUser } from "../../api/userService";

const Navbar = () => {
  const navigator = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigator("/signin");
  };
  const [user, setUser] = useState<UserType>();
  const getUserFn = async () => {
    const res = await getUser();
    setUser(res.data);
  };
  useEffect(() => {
    getUserFn();
  }, []);
  return (
    <div>
      <div className="navigate">
        ✍️ Todo App
        <div className="navigate-second">
          {user ? (
            <p>
              Hi, <span className="navName">{user?.name}</span>
            </p>
          ) : null}
          <button className="logoutBtn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
