import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/authAPI";
import { useDispatch } from "react-redux";
import { useUserQuery, userAPI } from "../../services/userAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownMenu from "../DropdownMenu";

const Layout = ({ children }) => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isFetching } = useUserQuery();

  const handleLogout = async () => {
    const res = await logout();
    if (!res.error) {
      dispatch(userAPI.util.resetApiState());
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col h-[100vh]">
      <header className="flex px-6 py-2 items-center justify-between shadow-md">
        <Link to={"/"} className="text-gray-900 text-[3rem] font-bold">
          TM
        </Link>
        <nav>
          {!isFetching &&
            (user ? (
              <DropdownMenu
                items={[{ title: "Logout", onClick: handleLogout }]}
              >
                <div className="flex space-x-2 items-center">
                  <span className="capitalize rounded-full py-2 px-4 bg-gray-300 select-none">
                    {user.name.split("")[0]}
                  </span>
                  <h2>{user.name}</h2>
                </div>
              </DropdownMenu>
            ) : (
              <ul className="flex space-x-6 text-[1.1rem]">
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            ))}
        </nav>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Layout;
