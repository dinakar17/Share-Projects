import { Dispatch, SetStateAction, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
import { AppDispatch } from "../reduxStore/store";
import { useDispatch } from "react-redux";
import { logOut } from "../reduxStore/StatesContainer/auth/AuthSlice";

type NavbarProps = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

const Navbar = ({user, setUser}: NavbarProps) => {
  let navigate = useNavigate();
  let dispatch = useDispatch<AppDispatch>();
  let location = useLocation();
  

  const handleLogOut = () => {
    // Since we're checking the user's presence in local storage, log out simply means removing the user from local storage
    // logOut() will dispatch a log out action (synchronous action) to the reducer
    dispatch(logOut());
    navigate("/signIn");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    // If token is expired then we have to logOut the user
    if (token) {
      // still needs to be updated
      const decodedToken: any = decode(token);
      // console.log(decodedToken.exp*10000 - new Date().getTime());
    
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
    }

    setUser(JSON.parse(localStorage.getItem('profile') as string));
    }
  , [location]);

  return (
    <header>
      <nav className="flex justify-between items-center p-3 shadow-lg">
        <h1 className="font-pacifico tracking-widest text-2xl">
          Share Projects
        </h1>
        <ul className="flex gap-10 items-center">
          <li>
            <span
              onClick={() => navigate("/create")}
              className="cursor-pointer"
            >
              Create
            </span>
          </li>
          <li>
            <a href="#home">Collaboration</a>
          </li>
          <li>
            <a href="#home">About</a>
          </li>
          {user ? (
            <button
              onClick={handleLogOut}
              className="bg-orange-600 p-1 rounded-md"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/signIn")}
              className="bg-orange-600 p-1 rounded-md"
            >
              Log In
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
