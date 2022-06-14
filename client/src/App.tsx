import { useState } from "react";
import { Form, Navbar, ProjectCard } from "./components";
import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import ProjectCardsList from "./components/ProjectCardsList";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  const [details, setDetails] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    github: "",
  });
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") as string)
  );

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route  path="/create"  element={ <div className="flex justify-evenly items-center min-h-screen"> <Form setDetails={setDetails} details={details} /> <ProjectCard details={details} /> </div> } />
          <Route path="/" element={<ProjectCardsList setDetails={setDetails} details={details} /> } />
          <Route path="/signIn" element={!user ? <SignIn /> : <Navigate to="/" replace />} />
          <Route path="/signUp" element={!user ? <SignUp /> : <Navigate to="/" replace />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
