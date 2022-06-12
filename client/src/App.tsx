import { useState } from "react";
import { Form, Navbar, ProjectCard } from "./components";

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
      <Navbar />
      <div className="flex justify-evenly items-center min-h-screen">
        <Form setDetails={setDetails} details={details}/>
        <ProjectCard details={details}/>
      </div>
    </>
  );
}

export default App;
