import { Form, Navbar, ProjectCard } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex justify-evenly items-center min-h-screen">
      <Form />
      <ProjectCard />
      </div>
    </>
  );
}

export default App;
