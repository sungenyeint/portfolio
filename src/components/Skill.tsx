"use client";

import { FaPhp, FaDocker, FaNodeJs, FaReact, FaVuejs, FaAws } from "react-icons/fa";
import { SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiMongodb, SiMysql, SiGit, SiNuxtdotjs } from "react-icons/si";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const skills = [
    { icon: <FaPhp className="text-5xl text-indigo-700 mb-2" />, label: "PHP" },
    { icon: <FaDocker className="text-5xl text-blue-500 mb-2" />, label: "Docker" },
    { icon: <FaNodeJs className="text-5xl text-green-600 mb-2" />, label: "Node.js" },
    { icon: <FaReact className="text-5xl text-cyan-500 mb-2" />, label: "React" },
    { icon: <SiNextdotjs className="text-5xl text-black mb-2" />, label: "Next.js" },
    { icon: <FaVuejs className="text-5xl text-green-500 mb-2" />, label: "Vue" },
    { icon: <SiNuxtdotjs className="text-5xl text-green-500 mb-2" />, label: "Nuxt.js" },
    { icon: <SiJavascript className="text-5xl text-yellow-400 mb-2" />, label: "JavaScript" },
    { icon: <SiTypescript className="text-5xl text-blue-600 mb-2" />, label: "TypeScript" },
    { icon: <SiHtml5 className="text-5xl text-orange-600 mb-2" />, label: "HTML5" },
    { icon: <SiCss3 className="text-5xl text-blue-700 mb-2" />, label: "CSS3" },
    { icon: <SiMongodb className="text-5xl text-green-700 mb-2" />, label: "MongoDB" },
    { icon: <SiMysql className="text-5xl text-blue-800 mb-2" />, label: "MySQL" },
    { icon: <SiGit className="text-5xl text-orange-500 mb-2" />, label: "Git" },
    { icon: <FaAws className="text-5xl text-black mb-2" />, label: "AWS" },
];

type skill = {
    icon: React.ReactNode;
    label: string;
};

function chunkArray(array: skill[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

export default function Skill() {
    const columns = 8;
    const rows = chunkArray(skills, columns);

    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 });
        }
    }, [inView, controls]);

    return (
        <motion.section
            id="skill"
            className="py-20"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        My <span className="text-blue-600 dark:text-blue-400">Skills</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Technologies and tools I use to build modern web applications
                    </p>
                </div>
                <div className="space-y-8 w-full overflow-hidden">
                    {rows.map((row, idx) => {
                        // Duplicate the row for seamless animation
                        const displayRow = idx % 2 === 1 ? [...row].reverse() : row;
                        const marqueeRow = [...displayRow, ...displayRow];
                        return (
                            <div
                                key={idx}
                                className={`relative w-full h-22 overflow-hidden marquee-row`}
                            >
                                <div
                                    className={`absolute flex items-center h-full animate-marquee${idx % 2 === 1 ? "-reverse" : ""}`}
                                    style={{ minWidth: '200%' }}
                                >
                                    {marqueeRow.map((skill, i) => (
                                        <div className="flex flex-col items-center w-1/6 px-2" key={i}>
                                            {skill.icon}
                                            <span className="font-semibold text-gray-700 dark:text-gray-100">{skill.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
