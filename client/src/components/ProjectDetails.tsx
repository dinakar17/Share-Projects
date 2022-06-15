import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../reduxStore/store";
import { Details } from "../types";

const ProjectDetails = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  // Get the Id in url
  let id = useParams();
  // filter out the post matching that id;
  const post = posts.filter((post: any) => post._id === id.id) as Details[];
  console.log(post);

  console.log(id);
  return (
    <div>
      <h1>{post[0].title}</h1>
      <p>{post[0].description}</p>
      <p>{post[0].category}</p>
      <p>{post[0].github}</p>
      <img src={post[0].image} alt="project" />
    </div>
  );
};

export default ProjectDetails;
