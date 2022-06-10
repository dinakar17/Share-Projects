import React from "react";

const ProjectCard = () => {
  return (
    <div className="flex flex-col w-[360px] shadow-md rounded-md">
      <div className="w-full">
        <img src="https://source.unsplash.com/user/c_v_r/1900x800" alt="" className="object-cover rounded-t-md"/>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h1 className="text-2xl font-bold">Project Title</h1>
        <span className="font-light bg-orange-200 mr-auto p-1">Category</span>
        <p className="font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          urna elit, posuere et vulputate sed, semper vitae augue. Morbi diam
          odio, varius id pretium eu, pretium quis dui.{" "}
        </p>
        <button>View on Github</button>
      </div>
    </div>
  );
};

export default ProjectCard;
