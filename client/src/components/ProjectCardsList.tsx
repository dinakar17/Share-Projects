// Note: Read, Delete Operation in CRUD is carried on in this File

import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import {
  deletePost,
  fetchPosts,
  getProjectsBySearch,
} from "../reduxStore/StatesContainer/posts/postsSlice";
import { AppDispatch, RootState } from "../reduxStore/store";
import Form from "./Form";
import { Details } from "../types";
import { useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

// Typescript
type ProjectCardsListProps = {
  details: Details;

  // setDetails: (details: object | ((prevDetails: object) => object)) => void;
  // setDetails: SetStateAction<{ title: string; category: string; description: string; image: string; github: string; }>
  setDetails: Dispatch<SetStateAction<Details>>;
};

const ProjectCardsList = ({ details, setDetails }: ProjectCardsListProps) => {
  // state.posts here name 'posts' comes from the name of the reducer given in the configure Store
  const posts = useSelector((state: RootState) => state.posts.posts);
  console.log(posts);
  const dispatch = useDispatch<AppDispatch>();
  const navigate=  useNavigate();

  const [open, setOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const [search, setSearch] = useState("");
  const [tags , setTags] = useState<String[]>([]);

  useEffect(() => {
    //Process: fetchPosts(in PostsSlice) => fetchPosts(in api/index.tsx) => getProjects (server/controllers/posts.js)
    dispatch(fetchPosts());
    // console.log(posts);
  }, []);


  const handleUpdate = (id: String) => {
    // Opens the modal
    setOpen(true);
    if (posts.length > 0) {
      // filter the post matching the id
      const post = posts.filter((post: any) => post._id === id) as Details[];
      // set the details to the post
      console.log(post);
      // Changes the "post" button into "update" button
      setShouldUpdate(1);
      // This setDetails fills all the input fields of the form to the details that are need to be updated!
      setDetails((prevState) => ({
        ...prevState,
        title: post[0].title,
        category: post[0].category,
        description: post[0].description,
        image: post[0].image,
        github: post[0].github,
      }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

 // Search #2: Dispatch the *getProjectsBySearch* asynchronous action
  const searchPost = () => {
    // trim() removes space from both sides of the string
    if(search.trim() || tags){
      dispatch(getProjectsBySearch({search, tags: tags.join(",")}));
      navigate(`/projects/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
    } else{
      navigate("/projects");
    }
  }

  const handleKeyPress = (e: any) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  }
  const handleAddChip = (tag: String) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete: String) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <>
      <div className="flex">
        {/* Search #1: Configure an Input Field */}
        <input
          onKeyDown={handleKeyPress}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          type="text"
          placeholder="Search for the projects and then press Enter"
          className="w-full border-2 rounded-full shadow-lg p-2 focus:shadow-md focus:p-4 transition-all m-2"
        />
        <ChipInput 
         style={{margin: '10px 0'}}
         value={tags}
         fullWidth
         onAdd={(chip: String) => handleAddChip(chip)}
         onDelete={(chip) => handleDeleteChip(chip)}
         label="Search tags"
         variant="outlined"
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {posts.map((post: any) => (
          <div
            className="flex flex-col shadow-md rounded-md  h-96 w-80"
            key={post._id}
          >
            <div className="h-[40%] cursor-pointer" onClick={() => navigate(`/projects/${post._id}`)}>
              <img
                src={post.image}
                alt=""
                className="object-cover w-full h-full rounded-t-md"
              />
            </div>
            <div className="flex flex-col gap-3 h-[60%] pl-2">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <span className="font-light bg-orange-400 mr-auto p-1">
                {post.category}
              </span>
              <p className="font-medium w-full break-words">
                {post.description}
              </p>
              <span>{moment(post.createdAt).fromNow()}</span>
              <div>
                <button>View on Github</button>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdate(post._id)}
                >
                  Edit
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <Form
                    details={details}
                    setDetails={setDetails}
                    shouldUpdate={shouldUpdate}
                    id={post._id}
                  />
                </Dialog>
                <button
                  // Update: How to dispatch(fetchPost()) again after we've deleted the post?
                  onClick={() => {
                    dispatch(deletePost(post._id));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectCardsList;
