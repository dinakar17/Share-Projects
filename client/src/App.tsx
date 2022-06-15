import { useState } from "react";
import { Form, Navbar, ProjectCard } from "./components";
import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import ProjectCardsList from "./components/ProjectCardsList";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ProjectDetails from "./components/ProjectDetails";

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
      {/* pass in user, setUser to update between LogIn and LogOut Button */}
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route  path="/create"  element={user ? <div className="flex justify-evenly items-center min-h-screen"> <Form setDetails={setDetails} details={details} /> <ProjectCard details={details} /> </div> : <Navigate to="/signIn" replace /> } />
          <Route path="/projects/search" element={<ProjectCardsList setDetails={setDetails} details={details} /> } />
          <Route path="/projects" element={<ProjectCardsList setDetails={setDetails} details={details} /> } />
          <Route path="/projects/:id" element={<ProjectDetails/>}/>
          <Route path="/signIn" element={!user ? <SignIn /> : <Navigate to="/projects" replace />} />
          <Route path="/signUp" element={!user ? <SignUp /> : <Navigate to="/projects" replace />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
