import { useState } from "react";
import { Form, Navbar, ProjectCard } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectCardsList from "./components/ProjectCardsList";

function App() {
  const [details, setDetails] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    github: "",
  });

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/create"
            element={
              <div className="flex justify-evenly items-center min-h-screen">
                <Form setDetails={setDetails} details={details} />
                <ProjectCard details={details} />
              </div>
            }
          />
          {/* Rendering a list of */}
          <Route path="/" element={<ProjectCardsList setDetails={setDetails} details={details} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
