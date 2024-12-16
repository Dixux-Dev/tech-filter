import projects from "@/data/projects";
import ProjectContainer from "./projectContainer";

const Projectpage = async ({ params }) => {
  const projectId = (await params).id;

  const project = projects.find((p) => {
    return p.id.toString() === projectId;
  });

  return (
    <div className="container px-5 mx-auto">
      {!project ? (
        <h1>Proyecto no encontrado</h1>
      ) : (
        <ProjectContainer project={project}></ProjectContainer>
      )}
    </div>
  );
};

export default Projectpage;
