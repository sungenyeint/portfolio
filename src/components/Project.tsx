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
        <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col overflow-hidden group">
            {/* Project Image */}
            <div className="h-44 w-full overflow-hidden">
                <img
                    src={`/projects/${image}`}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            {/* Content (hidden on hover) */}
            <div className="flex flex-col flex-1 p-5 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm mb-3 flex-1">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((technology) => (
                        <span key={technology} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{technology}</span>
                    ))}
                </div>
            </div>
            {/* Hover overlay covers entire card */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-800 z-10">
                <button
                    className="flex items-center gap-2 px-5 py-2 bg-white/90 text-gray-900 rounded-full font-semibold shadow hover:bg-white"
                    onClick={onViewDetails}
                >
                    <FaSearch />
                    <span className="text-gray-600 font-semibold drop-shadow-lg text-right hover:cursor-pointer">View Details</span>
                </button>
            </div>
        </div>
    )
}

export default Project
