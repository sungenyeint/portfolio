"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";


export default function HeroSection() {
    return (
        <motion.div
            className="flex flex-col md:flex-row items-center justify-center w-full"
            initial={{ opacity: 0.3, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            <div className="text-center md:text-right md:mr-8">
                <h2 className="text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-200 mb-2">Hi, I&apos;m MEE PONT</h2>
                <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 dark:text-white">WEB DEVELOPER</h1>
                <div className="flex justify-center md:justify-end gap-4 mt-4">
                    <Link href="https://github.com/sungenyeint" className="text-gray-700 dark:text-gray-200 hover:text-gray-400 dark:hover:text-white"><FaGithub size={20} /></Link>
                    <Link href="https://www.linkedin.com/in/su-nge-nyeint-76a6052a1/" className="text-gray-700 dark:text-gray-200 hover:text-gray-400 dark:hover:text-white"><FaLinkedin size={20} /></Link>
                    <Link href="https://www.facebook.com/story.oo.9" className="text-gray-700 dark:text-gray-200 hover:text-gray-400 dark:hover:text-white"><FaFacebook size={20} /></Link>
                    <Link href="https://www.instagram.com/meepont123" className="text-gray-700 dark:text-gray-200 hover:text-gray-400 dark:hover:text-white"><FaInstagram size={20} /></Link>
                </div>
            </div>

            <Image
                src="/profile.jpg"
                alt="Duncan"
                width={300}
                height={400}
                className="rounded-xl my-10 md:my-0"
            />

            <div className="text-center md:text-left md:ml-8">
                <p className="text-lg text-gray-700 dark:text-gray-100 mt-20 md:mt-40 animate-bounce mb-5">I&apos;m a music lover and<br />Web developer.</p>
                <Link href="#contact" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">Hire me</Link>
            </div>
        </motion.div>
    );
}
