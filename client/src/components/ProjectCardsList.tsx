import { useEffect, useState } from "react";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPosts,
  updatePost,
} from "../reduxStore/StatesContainer/posts/postsSlice";
import { AppDispatch, RootState } from "../reduxStore/store";
import moment from "moment";
import Form from "./Form";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

// Typescript
type ProjectCardsListProps = {
  details: {
    title: string;
    category: string;
    description: string;
    image: string;
    github: string;
  };

  // setDetails: (details: object | ((prevDetails: object) => object)) => void;
  // setDetails: SetStateAction<{ title: string; category: string; description: string; image: string; github: string; }>
  setDetails: Dispatch<
    SetStateAction<{
      title: string;
      category: string;
      description: string;
      image: string;
      github: string;
    }>
  >;
};

const ProjectCardsList = ({ details, setDetails }: ProjectCardsListProps) => {
  // state.posts here 'posts' comes from the name of the reducer given in the configure Store
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
    // console.log(posts);
  }, []);

  const [open, setOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(0);

  const handleClickOpen = (id: String) => {
    setOpen(true);
    if (posts.length > 0) {
      // filter the post matching the id
      const post = posts.filter((post: any) => post._id === id) as typeof details[];
      // set the details to the post
      console.log(post);
      setShouldUpdate(1);
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

  return (
    <>
      <div>Hello There</div>
      {posts.map((post: any) => (
        <div
          className="flex flex-col w-80 shadow-md rounded-md p-5 gap-10"
          key={post._id}
        >
          <img src={post.image} alt="" className="object-cover rounded-t-md" />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <span className="font-light bg-orange-400 mr-auto p-1">
              {post.category}
            </span>
            <p className="font-medium w-full break-words">{post.description}</p>
            <span>{moment(post.createdAt).fromNow()}</span>
            <button>View on Github</button>
            <div>
              <Button
                variant="outlined"
                onClick={() => handleClickOpen(post._id)}
              >
                Edit
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <Form details={details} setDetails={setDetails} shouldUpdate={shouldUpdate} id={post._id} />
              </Dialog>
            </div>
            <button
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCardsList;
