"use client";

import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";

const PROJECTS = [
  // {
  //   title: "Tic Tac Toe Game",
  //   description: "Interactive digital version of the classic game.",
  //   detail:
  //     "Project description. The Tic Tac Toe game project is a simple and interactive application designed to recreate the classic two-player game in a digital format. The project aims to provide an engaging and fun user experience while demonstrating core programming concepts, logic development, and UI design.",
  //   technologies: ["React.js", "Next.js"],
  //   images: "tic-tac-toe.png",
  //   link: "https://tic-tac-toe-sage-gamma-74.vercel.app",
  // },
  // {
  //   title: "Chat App",
  //   description: "Guest App Walkthrough Screens.",
  //   detail:
  //     'Real-Time Messaging: Users can exchange messages instantly without refreshing the page. Event-Based Communication: Events such as "user joined," "message sent," and "user disconnected" keep all participants updated in real-time. Rooms/Channels: Supports creating private or public chat rooms for group discussions. Typing Indicators: Displays when a user is typing to enhance interactivity. Scalability: Built on WebSocket technology with fallback to HTTP long polling, ensuring compatibility across various devices and networks.',
  //   technologies: ["Node.js", "WebSocket", "Express.js", "render"],
  //   images: "chat-app.png",
  //   link: "https://chat-app-c6tq.onrender.com/",
  // },
  {
    title: "(POS) System for Baby Store",
    description: "Retail management for baby stores.",
    detail:
      "The Baby Store POS system is a comprehensive solution designed to streamline sales, inventory management, and purchase tracking specifically tailored for baby product retail businesses. This system provides an intuitive interface and advanced reporting tools to help store owners efficiently manage daily operations and make informed business decisions.",
    technologies: ["PHP", "nginx", "MySQL", "Laravel", "Bootstrap", "EC2"],
    images: ["pos.png", "pos1.png", "pos2.png", "pos3.png", "pos4.png", "pos5.png"],
    link: "https://babystore-pos.duckdns.org/admin/login",
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
    images: ["bfp1.png", "bfp2.png", "bfp3.png", "bfp4.png", "bfp5.png"],
    link: "https://big-five-personality-traits.vercel.app/",
  },
  {
    title: "Chat Room App",
    description: "Real-time communication platform",
    detail:
      "The Chat Room App is a real-time messaging platform that allows users to create and join chat rooms for seamless communication. Built with modern web technologies, this app provides a user-friendly interface and robust features to enhance the chatting experience.",
    technologies: [
      "vue.js",
      "Nuxt.js",
      "Tailwind CSS",
      "vercel",
      "express.js",
      "MongoDB",
      "WebSocket",
      "jwt",
    ],
    images: ["capp0.png", "capp1.png", "capp2.png", "capp3.png", "capp4.png", "capp5.png", "capp6.png", "capp7.png"],
    link: "https://nuxt-chat-app-three.vercel.app",
  },
  {
    title: "Money Tracker app",
    description: "Track your income and expenses effortlessly",
    detail:
      "The Nuxt Money Tracker is a modern and responsive finance management app that helps users track and visualize their daily income and expenses. 🔎 Key Features: 📊 Interactive charts to analyze financial trends 🗂 Categorized transaction tracking with clean UI 💰 Budget overview and spending insights 📁 Multiple wallets support (cash, bank, card) 📱 Fully responsive and lightweight design",
    technologies: [
      "vue.js",
      "Nuxt.js",
      "Tailwind CSS",
      "Firebase authentication",
      "vercel",
      "express.js",
      "MongoDB",
    ],
    images: ["money-tracker-app.png", "mt0.png", "mt1.png", "mt2.png", "mt3.png", "mt4.png", "mt5.png", "mt6.png", "mt7.png"],
    link: "https://nuxt-money-tracker.vercel.app/",
  },
  {
    title: "Restaurant POS System",
    description: "Manage orders and inventory efficiently",
    detail:
      "The Restaurant POS System is a comprehensive solution designed to streamline order management, inventory tracking, and sales reporting for restaurants. This system provides an intuitive interface for staff to take orders, process payments, and manage tables, while also offering robust backend features for inventory control and analytics.",
    technologies: [
      "vue.js",
      "Nuxt.js",
      "Tailwind CSS",
      "vercel",
      "render",
      "express.js",
      "MongoDB",
      "WebSocket",
      "jwt",
    ],
    images: ["rpos2.png", "rpos1.png", "rpos2.png", "rpos3.png", "rpos4.png", "rpos5.png", "rpos6.png", "rpos7.png"],
    link: "https://nuxt-restaurant-system.vercel.app",
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
      "Firebase Authentication",
      "MongoDB",
      "Express.js",
      "vercel",
    ],
    images: ["mh2.jpg", "mh1.jpg", "mh3.jpg", "mh4.jpg", "mh5.jpg", "mh6.jpg"],
    link: "https://money-history-client.vercel.app",
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
