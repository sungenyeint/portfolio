"use client";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function About() {
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
            id="about"
            className="max-w-5xl mx-auto py-20 px-6"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                        <Image
                            src="/profile.png"
                            alt="Profile"
                            width={200}
                            height={200}
                            className="rounded-2xl object-cover shadow-xl transition-transform duration-300"
                        />
                    </div>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        About <span className="text-blue-600 dark:text-blue-400">Me</span>
                    </h2>
                    <p className="mb-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        I&apos;m a passionate <span className="font-semibold text-blue-600 dark:text-blue-400">Senior Web Developer</span> with extensive experience building scalable, maintainable, and high-performance web applications that deliver exceptional user experiences.
                    </p>
                    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Over the past years, I&apos;ve led development teams and collaborated with cross-functional partners to create innovative digital solutions that drive business growth and user engagement.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="https://drive.google.com/file/d/1NKpcNXv_XT4Zx5eu8JPVThP2tND2FDgy/view"
                            target="_blank"
                            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition flex items-center gap-2"
                        >
                            <FaDownload />
                            Download Resume
                        </Link>
                        <Link
                            href="#experience"
                            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all hover:shadow-md"
                        >
                            My Journey
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
