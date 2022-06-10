import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center p-3 shadow-lg">
        <h1 className="font-pacifico tracking-widest text-2xl">Share Projects</h1>
        <ul className="flex gap-10">
          <li>
            <a href="#home">Create</a>
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
