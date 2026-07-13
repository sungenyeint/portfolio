"use client";

import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../constants/project";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

interface Project {
  title: string;
  description: string;
  detail: string;
  technologies: string[];
  images: string[];
  link: string;
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <motion.section
      id="projects"
      className="py-20"
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Featured{" "}
            <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            A selection of my recent work and case studies
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={
                `group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4
                                       hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
              }
            >
              {/* Image */}
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                  src={`/projects/${project.images[0]}`}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:opacity-95 transition duration-300"
                  priority={idx < 3}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300
                                                   dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* View link */}
              <button
                onClick={() => setSelectedProject(project)}
                className="mt-6 inline-flex items-center justify-center w-full py-2.5 rounded-lg
                                           bg-blue-600 text-white text-sm font-semibold
                                           hover:bg-blue-700 transition-all duration-300 hover:cursor-pointer"
              >
                View Detail
              </button>
            </motion.div>
          ))}
        </div>

        {/* Show more / Show less */}
        {PROJECTS.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="btn-primary"
              aria-expanded={showAll}
            >
              {showAll ? "Show less" : `Show more (${PROJECTS.length - 3})`}
            </button>
          </div>
        )}
      </div>
      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}
