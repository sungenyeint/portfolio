import Image from 'next/image';
import { FaSearch } from 'react-icons/fa'

interface ProjectProps {
    title: string;
    description: string;
    technologies: string[];
    image: string;
    onViewDetails?: () => void;
}

const Project = ({ title, description, technologies, image, onViewDetails }: ProjectProps) => {
    return (
    <motion.div
      key={idx}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4
                               hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <Image
        src={`/projects/${project.image}`}
        alt={project.title}
        width={500}
        height={300}
        className="rounded-lg object-cover h-40 w-full group-hover:opacity-95 transition duration-300"
      />

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
        onClick={() => openModal(project)}
        className="mt-6 inline-flex items-center justify-center w-full py-2.5 rounded-lg
                                   bg-blue-600 text-white text-sm font-semibold
                                   hover:bg-blue-700 transition-all duration-300 hover:-translate-y-0.5"
      >
        View Detail
      </button>
    </motion.div>
    )
}

export default Project
