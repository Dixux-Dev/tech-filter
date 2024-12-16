"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

const ProjectContainer = ({ project }) => {
  return (
    <motion.div layoutId={`card-container-${project.id}`}>
      <motion.div layoutId={`card-image-${project.id}`}>
        <Skeleton className="w-full h-36 my-5" />
      </motion.div>
      <motion.div layoutid="{`card-title-${project.id}`}">
        <h1 className="text-3xl mb-">{project.title}</h1>
      </motion.div>
      <motion.p layoutId={`card-description-${project.id}`}>
        {project.description}
      </motion.p>
    </motion.div>
  );
};

export default ProjectContainer;
