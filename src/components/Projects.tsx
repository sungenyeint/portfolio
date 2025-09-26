"use client";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Project from "./Project";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

interface ProjectType {
    title: string;
    description: string;
    technologies: string[];
    image: string;
}

const PROJECTS: ProjectType[] = [
    {
        title: "Tic Tac Toe Game",
        description: "Interactive digital version of the classic game",
        technologies: ["React.js", "Next.js"],
        image: "tic-tac-toe.png",
    },
    {
        title: "Chat app",
        description: "Guest App Walkthrough Screens",
        technologies: ["Node.js", "WebSocket", "Express.js"],
        image: "chat-app.png",
    },
    {
        title: "(POS) System for Baby Store",
        description: "Retail management for baby stores",
        technologies: ["PHP", "Laravel", "MySQL", "Bootstrap"],
        image: "pos-system.png",
    },
    // Add more projects as needed
];

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();
    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 });
        }
    }, [inView, controls]);

    // Modal logic
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    const handleViewDetails = (project: ProjectType) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

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
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        Featured <span className="text-blue-600 dark:text-blue-400">Projects</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A selection of my recent work and case studies
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, idx) => (
                        <Project
                            key={idx}
                            {...project}
                            onViewDetails={() => handleViewDetails(project)}
                        />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                        View All Projects
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
            {/* Modal for project details */}
            {modalOpen && selectedProject && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all">
                    <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                            onClick={closeModal}
                            aria-label="Close details"
                        >
                            <FaTimes />
                        </button>
                        <Image
                            src={`/projects/${selectedProject.image}`}
                            alt={selectedProject.title}
                            className="w-full h-48 object-cover rounded-xl mb-4"
                            width={400}
                            height={300}
                        />
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">{selectedProject.title}</h3>
                        <p className="text-gray-700 mb-4">{selectedProject.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedProject.technologies.map((tech: string) => (
                                <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{tech}</span>
                            ))}
                        </div>
                    </div>
                    {/* Overlay click closes modal */}
                    <div className="fixed inset-0 z-0" onClick={closeModal}></div>
                </div>
            )}
        </motion.section>
    );
}
