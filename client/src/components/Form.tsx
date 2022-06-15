// Note: Create, Update operations in CRUD are carried out in this file

import React, { Dispatch, SetStateAction } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// getPosts is async action creator
import {
  createPost,
  updatePost,
} from "../reduxStore/StatesContainer/posts/postsSlice";
import { AppDispatch } from "../reduxStore/store";

type FormProps = {
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

  shouldUpdate?: Number;
  id?: String;
};

const Form = ({ details, setDetails, shouldUpdate, id }: FormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(details);
    // Check whether we clicked Update Button or Post(create) button
    if (shouldUpdate === 1) {
      let dataTobeUpdated = { id: id as String, details: details };
      dispatch(updatePost(dataTobeUpdated));
    } else {
      // Aim: To create a Post
      /*
      Process: dispatch(createPost(details))
      1)Invokes createPost(details) - Asynchronous action creator (Ref: ./reduxStore/StatesContainer/posts/postsSlice)
      2) Api.createPost(details) which makes a post request to the server and returns a response (Ref: api/index.tsx)
      */
      dispatch(createPost(details));

      // Update: Better to use navigate after we've successfully created the Post i.e., use in createPost.fulfilled
      navigate("/projects");
    }
    setDetails({
      title: "",
      category: "",
      description: "",
      image: "",
      github: "",
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form
        className="flex flex-col shadow-md rounded-md p-5 gap-10 w-80"
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          placeholder="Project title"
          className="border-b-2 focus:outline-none focus:shadow-md focus:p-2 transition-all"
          value={details.title}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={details.category}
          className="border-b-2 focus:outline-none focus:shadow-md focus:p-2 transition-all"
          onChange={handleChange}
        />
        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          value={details.description}
          className="border-b-2 focus:outline-none focus:shadow-md focus:p-2 transition-all"
          onChange={handleChange}
        />
        <FileBase
          name="image"
          type="file"
          multiple={false}
          onDone={({ base64 }: any) =>
            setDetails({ ...details, image: base64 })
          }
        />
        <input
          name="github"
          value={details.github}
          placeholder="Github link"
          className="border-b-2 focus:outline-none focus:shadow-md focus:p-2 transition-all"
          onChange={handleChange}
        />
        <button type="submit" className="bg-orange-400 p-2 ">Post</button>
      </form>
    </>
  );
};

export default Form;
