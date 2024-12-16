"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StackIcon from "tech-stack-icons";

import projects from "@/data/projects";

const techs = [...new Set(projects.flatMap((project) => project.techs))];

export default function Projects() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTechs = searchParams.get("filter")?.split(",") || [];

  const [activeTechs, setActiveTechs] = useState(selectedTechs);

  const handleTechClick = (tech) => {
    let updatedTechs;

    if (activeTechs.includes(tech)) {
      updatedTechs = activeTechs.filter((t) => t !== tech);
    } else {
      updatedTechs = [...activeTechs, tech];
    }

    setActiveTechs(updatedTechs);

    const query =
      updatedTechs.length > 0 ? `?filter=${updatedTechs.join(",")}` : "";

    router.push(`/${query}`);
  };

  const filteredProjects = projects.filter(
    (project) =>
      activeTechs.length === 0 ||
      activeTechs.some((tech) => project.techs.includes(tech))
  );

  return (
    <div className="mt-12">
      {!isSSR && (
        <>
          <div>
            <h2>Filter by Techs</h2>
            <div className="flex gap-2 my-3">
              <AnimatePresence>
                {techs
                  .sort((a, b) => {
                    // Si 'a' está en activeTechs, colócalo primero
                    const aIsActive = activeTechs.includes(a) ? -1 : 1;
                    const bIsActive = activeTechs.includes(b) ? -1 : 1;
                    return aIsActive - bIsActive;
                  })
                  .map((tech) => (
                    <motion.div
                      layout
                      key={tech}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Badge
                        onClick={() => handleTechClick(tech)}
                        className={`cursor-pointer rounded-2xl bg-gray-500 ${
                          activeTechs.includes(tech)
                            ? "bg-gradient-to-br from-fuchsia-500 to-rose-500"
                            : ""
                        }`}
                      >
                        <StackIcon
                          name={tech}
                          className="h-6 w-15"
                        />
                      </Badge>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <h2>Projects</h2>
            <div className="flex gap-3 my-3 flex-wrap">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layoutId={`card-container-${project.id}`}
                  >
                    <Card className="w-[250px]">
                      <Link href={`/projects/${project.id}`}>
                        <motion.div layoutId={`card-image-${project.id}`}>
                          <Skeleton className="w-full h-36" />
                        </motion.div>
                      </Link>
                      <CardHeader>
                        <CardTitle>
                          <Link href={`/projects/${project.id}`}>
                            <motion.div layoutId={`card-title-${project.id}`}>
                              {project.title}
                            </motion.div>
                          </Link>
                        </CardTitle>
                        <CardDescription>
                          <motion.div
                            layoutId={`card-description-${project.id}`}
                          >
                            {project.description}
                          </motion.div>
                          <div className="flex gap-2 mt-4">
                            {project.techs.map((tech) => (
                              <Badge
                                key={tech}
                                onClick={() => handleTechClick(tech)}
                                className={`cursor-pointer rounded-2xl bg-gray-500 ${
                                  activeTechs.includes(tech)
                                    ? "bg-gradient-to-br from-fuchsia-500 to-rose-500"
                                    : ""
                                }`}
                              >
                                <StackIcon
                                  name={tech}
                                  className="h-6 w-15"
                                />
                              </Badge>
                            ))}
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
