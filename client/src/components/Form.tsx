import React, { Dispatch, SetStateAction } from "react";
import FileBase from 'react-file-base64'

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
};


const Form = ({details, setDetails }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) => {
    console.log(e);
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  
  return (
    <form
      className="flex flex-col shadow-md rounded-md p-5 gap-10 w-80"
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        placeholder="Project title"
        className="border-b-2 focus:outline-none"
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        className="border-b-2 focus:outline-none"
        onChange={handleChange}
      />
      <textarea
        name="description"
        rows={5}
        placeholder="Description"
        className="border-b-2 focus:outline-none"
        onChange={handleChange}
      />
      <FileBase name="image" type="file" onDone={({ base64 }: any) => setDetails({ ...details, image: base64 })}/>
      <input
        name="github"
        placeholder="Github link"
        className="border-b-2 focus:outline-none"
        onChange={handleChange}
      />
      <button className="bg-orange-400 p-2 ">Post</button>
    </form>
  );
};

export default Form;
