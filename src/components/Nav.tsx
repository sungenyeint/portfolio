"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const sections = [
    { id: "about", label: "About" },
    { id: "skill", label: "Skill" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

export default function Nav() {
    const [active, setActive] = useState("about");
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    // Theme logic
    useEffect(() => {
        // Check localStorage or system preference
        const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
        if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            let current = "about";
            for (const section of sections) {
                const el = document.getElementById(section.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 80 && rect.bottom > 80) {
                        current = section.id;
                        break;
                    }
                }
            }
            setActive(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // set on mount

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            {/* Desktop Nav */}
            <nav className="fixed top-5 md:top-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-full px-6 py-1 items-center space-x-6 z-50 hidden md:flex">
                <Image src="/profile.png" alt="profile" width={40} height={40} className="rounded-full" />
                {sections.map((section) => (
                    <Link
                        key={section.id}
                        href={`#${section.id}`}
                        className={`${active === section.id
                            ? "bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                            : "text-gray-700 dark:text-gray-200 hover:text-gray-400 dark:hover:text-white"}`}
                    >
                        {section.label}
                    </Link>
                ))}
                <button
                    className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
            </nav>
            {/* Mobile Nav */}
            <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-full px-6 py-1 flex items-center z-50 md:hidden">
                <Image src="/profile.jpg" alt="profile" width={36} height={36} className="rounded-full mr-5" />
                <button
                    className="ml-3 text-gray-700 dark:text-gray-200 focus:outline-none"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars size={24} />
                </button>
                <button
                    className="ml-3 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
            </nav>
            {/* Modal Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 dark:bg-white/80 backdrop-blur-sm transition-all">
                    <button
                        className="absolute top-6 right-6 text-white dark:text-black text-3xl focus:outline-none"
                        aria-label="Close menu"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaTimes />
                    </button>
                    <Image src="/profile.jpg" alt="profile" width={64} height={64} className="rounded-full mb-6 border-4 border-white dark:border-black shadow" />
                    <ul className="flex flex-col gap-8 text-center">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <Link
                                    href={`#${section.id}`}
                                    className={`text-2xl font-semibold ${active === section.id
                                        ? "text-white dark:text-black border-b-2 border-white dark:border-black"
                                        : "text-gray-200 dark:text-gray-800 hover:text-white dark:hover:text-black"}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {section.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-8 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            )}
        </>
    );
}
