"use client";

import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "Tic Tac Toe Game",
    description: "Interactive digital version of the classic game.",
    detail:
      "Project description. The Tic Tac Toe game project is a simple and interactive application designed to recreate the classic two-player game in a digital format. The project aims to provide an engaging and fun user experience while demonstrating core programming concepts, logic development, and UI design.",
    technologies: ["React.js", "Next.js"],
    image: "tic-tac-toe.png",
    link: "https://tic-tac-toe-sage-gamma-74.vercel.app",
  },
  {
    title: "Chat App",
    description: "Guest App Walkthrough Screens.",
    detail:
      'Real-Time Messaging: Users can exchange messages instantly without refreshing the page. Event-Based Communication: Events such as "user joined," "message sent," and "user disconnected" keep all participants updated in real-time. Rooms/Channels: Supports creating private or public chat rooms for group discussions. Typing Indicators: Displays when a user is typing to enhance interactivity. Scalability: Built on WebSocket technology with fallback to HTTP long polling, ensuring compatibility across various devices and networks.',
    technologies: ["Node.js", "WebSocket", "Express.js", "render"],
    image: "chat-app.png",
    link: "https://chat-app-c6tq.onrender.com/",
  },
  {
    title: "(POS) System for Baby Store",
    description: "Retail management for baby stores.",
    detail:
      "The Baby Store POS system is a comprehensive solution designed to streamline sales, inventory management, and purchase tracking specifically tailored for baby product retail businesses. This system provides an intuitive interface and advanced reporting tools to help store owners efficiently manage daily operations and make informed business decisions.",
    technologies: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    image: "pos-system.png",
    link: "#",
  },
  {
    title: "Money History App",
    description: "Track your finances",
    detail:
      "The Money History Dashboard is a modern, responsive web application that helps users track and visualize their income and expenses in one place. 🔎 Key Features: 📊 Interactive income & expense charts 🗂 Categorized transaction history 🔐 Secure login via Google or Facebook (Firebase Auth)",
    technologies: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Firebase",
      "MongoDB",
      "Express.js",
      "vercel",
    ],
    image: "money-history.jpg",
    link: "https://money-history-client.vercel.app",
  },
  {
    title: "Big Five Personality Traits",
    description: "Interactive digital version of the classic game.",
    detail:
      "This is a bilingual (English & Myanmar) web application that introduces the Big Five Personality Traits—Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism—in an interactive and visually engaging way. The app is designed with a clean, responsive UI and supports both light and dark mode themes, offering a pleasant user experience across devices. Frontend: Next.js – React framework for server-side rendering and static site generation. React – Core JavaScript library for building user interfaces. Tailwind CSS – Utility-first CSS framework for styling. Firebase - Authentication Deployment: Vercel – Hosting platform optimized for Next.js apps. Other Possible Tools: TypeScript – For type-safe code (common in modern Next.js projects). ESLint/Prettier – Code formatting and linting.",
    technologies: [
      "React.js",
      "Next.js",
      "Typescript",
      "Tailwind CSS",
      "firebase",
      "vercel",
    ],
    image: "big-five-app.png",
    link: "https://big-five-personality-traits.vercel.app/",
  },
  {
    title: "Money Tracker app",
    description: "Track your income and expenses effortlessly",
    detail:
      "The Nuxt Money Tracker is a modern and responsive finance management app that helps users track and visualize their daily income and expenses. 🔎 Key Features: 📊 Interactive charts to analyze financial trends 🗂 Categorized transaction tracking with clean UI 💰 Budget overview and spending insights 📁 Multiple wallets support (cash, bank, card) 📱 Fully responsive and lightweight design",
    technologies: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Firebase authentication",
      "vercel",
    ],
    image: "money-tracker-app.png",
    link: "https://nuxt-money-tracker.vercel.app/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

interface Project {
  title: string;
  description: string;
  detail: string;
  technologies: string[];
  image: string;
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 250);
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
          {PROJECTS.map((project, idx) => (
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
          ))}
        </div>
      </div>
      {/* Glassmorphism Modal */}
      {modalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200]"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.25 }}
            className="
                relative
                bg-white/10 dark:bg-neutral-900/20
                backdrop-blur-xl
                border border-white/20
                shadow-2xl
                rounded-2xl
                p-12
                w-[100%]
                max-w-3xl
                text-white
              "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/30
                           backdrop-blur-md text-white rounded-full w-9 h-9 flex
                           items-center justify-center transition"
            >
              ✕
            </button>

            {/* Image */}
            <Image
              src={`/projects/${selectedProject.image}`}
              alt={selectedProject.title}
              width={600}
              height={300}
              className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64 mb-4"
            />

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-white">
              {selectedProject.title}
            </h3>

            {/* Description */}
            <p className="text-gray-200 mb-4 leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Detail */}
            {selectedProject.detail && (
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {selectedProject.detail}
              </p>
            )}

            {/* Tech */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/20 border border-white/30 rounded-full
                             text-xs text-white backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* External Link */}
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                className="inline-block mt-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600
                           text-white text-sm font-medium rounded-lg backdrop-blur-md
                           transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                View Project →
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}
