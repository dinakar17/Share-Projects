import React from "react";

const Form = () => {
  return (
    <form className="flex flex-col shadow-md rounded-md p-5 gap-10">
      <input placeholder="Project title" className="border-b-2 focus:outline-none" />
      <input placeholder="Category"  className="border-b-2 focus:outline-none" />
      <textarea rows={5} placeholder="Description"  className="border-b-2 focus:outline-none"/>
      <input type="file" />
      <input placeholder="Github link"  className="border-b-2 focus:outline-none" />
      <button className="bg-orange-200 p-2 ">Post</button>
    </form>
  );
};

export default Form;
