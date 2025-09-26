"use client";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function Services() {
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
            id="services"
            className="py-20"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        My <span className="text-blue-600 dark:text-blue-400">Services</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comprehensive solutions tailored to your business needs
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="100">
                    <div className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-700">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-gray-100">UI/UX Design</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Responsive, intuitive designs that prioritize user experience across all devices and platforms, backed by thorough research and testing.
                        </p>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-700">
                        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-3 text-gray-800">Front-end Development</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Modern, performant websites and applications built with React, Next.js, and cutting-edge technologies for seamless user interactions.
                        </p>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-900 hover:border-indigo-200 dark:hover:border-indigo-700">
                        <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-3 text-gray-800">Back-end Development</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Robust, scalable server architectures with Node.js, Express, and database solutions that ensure reliability and security for your data.
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
