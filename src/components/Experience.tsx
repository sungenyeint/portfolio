"use client";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function Experience() {
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
            id="experience"
            className="py-20"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        Work <span className="text-blue-600 dark:text-blue-400">Experience</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        My professional journey and achievements
                    </p>
                </div>
                <div className="relative" data-aos="fade-up" data-aos-delay="100">
                    {/* Timeline */}
                    <div className="border-l-2 border-blue-200 absolute h-full left-2 md:left-1/2 -translate-x-1/2"></div>

                    {/* Timeline Items */}
                    <div className="space-y-8">
                        {/* Item 1 */}
                        <div className="relative pl-12 md:pl-0 md:flex justify-between items-center w-full">
                            <div className="md:w-5/12 md:pr-8 md:text-right">
                                <h3 className="font-semibold text-lg text-blue-600">2020 - Present</h3>
                                <p className="font-bold text-xl text-gray-800 dark:text-gray-100">Senior Web Developer</p>
                            </div>
                            <div className="absolute w-4 h-4 bg-blue-600 rounded-full left-2 md:left-1/2 -translate-x-1/2 mt-1.5"></div>
                            <div className="md:w-5/12 mt-4 md:mt-0 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                                <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
                                    <li>Led development of scalable web applications with React and Node.js</li>
                                    <li>Architected RESTful APIs serving 10,000+ daily requests</li>
                                    <li>Mentored junior developers in modern best practices</li>
                                </ul>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="relative pl-12 md:pl-0 md:flex justify-between items-center w-full md:flex-row-reverse">
                            <div className="md:w-5/12 md:pl-8">
                                <h3 className="font-semibold text-lg text-purple-600">2019 - 2020</h3>
                                <p className="font-bold text-xl text-gray-800 dark:text-gray-100">Web Developer</p>
                            </div>
                            <div className="absolute w-4 h-4 bg-purple-600 rounded-full left-2 md:left-1/2 -translate-x-1/2 mt-1.5"></div>
                            <div className="md:w-5/12 mt-4 md:mt-0 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                                <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
                                    <li>Developed responsive front-end interfaces with React</li>
                                    <li>Optimized application performance by 40%</li>
                                    <li>Implemented CI/CD pipelines for automated deployments</li>
                                </ul>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="relative pl-12 md:pl-0 md:flex justify-between items-center w-full">
                            <div className="md:w-5/12 md:pr-8 md:text-right">
                                <h3 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400">2016 - 2018</h3>
                                <p className="font-bold text-xl text-gray-800 dark:text-gray-100">Junior Web Developer</p>
                            </div>
                            <div className="absolute w-4 h-4 bg-indigo-600 rounded-full left-2 md:left-1/2 -translate-x-1/2 mt-1.5"></div>
                            <div className="md:w-5/12 mt-4 md:mt-0 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                                <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
                                    <li>Built and maintained WordPress sites for small businesses</li>
                                    <li>Developed custom plugins and themes</li>
                                    <li>Implemented SEO best practices</li>
                                </ul>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="relative pl-12 md:pl-0 md:flex justify-between items-center w-full md:flex-row-reverse">
                            <div className="md:w-5/12 md:pl-8">
                                <h3 className="font-semibold text-lg text-yellow-600">2010 - 2015</h3>
                                <p className="font-bold text-xl text-gray-800 dark:text-gray-100">Bachelor of Engineering</p>
                                <p className="text-gray-600">Electronic Communication</p>
                            </div>
                            <div className="absolute w-4 h-4 bg-yellow-500 rounded-full left-2 md:left-1/2 -translate-x-1/2 mt-1.5"></div>
                            <div className="md:w-5/12 mt-4 md:mt-0 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                                <p className="text-gray-700 dark:text-gray-100">
                                    Technological University, Taunggyi | Graduated: 2016
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
