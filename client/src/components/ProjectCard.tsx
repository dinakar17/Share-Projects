type ProjectCardProps = {
  details: {
    title: string;
    category: string;
    description: string;
    image: string;
    github: string;
  };
};

const ProjectCard = ({ details }: ProjectCardProps) => {
  return (
    <div className="flex flex-col w-[360px] shadow-md rounded-md">
      <div className="w-full">
        <img src={details.image} alt="" className="object-cover rounded-t-md" />
        {/* "https://source.unsplash.com/user/c_v_r/1900x800" */}
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h1 className="text-2xl font-bold">{details.title}</h1>
        <span className="font-light bg-orange-400 mr-auto p-1">
          {details.category}
        </span>
        <p className="font-medium w-full break-words">{details.description}</p>
        <button>View on Github</button>
      </div>
    </div>
  );
};

export default ProjectCard;
