import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  return (
    <header>
      <nav className="flex justify-between items-center p-3 shadow-lg">
        <h1 className="font-pacifico tracking-widest text-2xl">
          Share Projects
        </h1>
        <ul className="flex gap-10">
          <li>
            <span onClick={() => navigate("/create")} className="cursor-pointer">
              Create
            </span>
          </li>
          <li>
            <a href="#home">Collaboration</a>
          </li>
          <li>
            <a href="#home">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
