"use client";

import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
});

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function Contact() {
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setStatus(null);
        try {
            const response = await fetch("https://formspree.io/f/xldldwro", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setStatus("success");
                reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
            console.error("Error submitting form:", error);
        }
        setLoading(false);
    };

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
            id="contact"
            className="py-20"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        Get In <span className="text-blue-600 dark:text-blue-400">Touch</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss potential opportunities?
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                    <div className="md:flex">
                        <div className="md:w-1/2 bg-blue-600 dark:bg-blue-900 p-10 text-white dark:text-gray-100">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                                        <FaMailBulk size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-blue-100 dark:text-blue-100">Email</p>
                                        <p className="text-lg font-semibold">sungenyeint@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                                        <FaPhone size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-blue-100 dark:text-blue-100">Phone</p>
                                        <p className="text-lg font-semibold">+959 777 777 777</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                                        <FaLocationArrow size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-blue-100 dark:text-blue-100">Location</p>
                                        <p className="text-lg font-semibold">Yangon, Myanmar</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                                <div className="flex space-x-4">
                                    <Link href="https://github.com/sungenyeint" className="bg-blue-500 hover:bg-blue-400 rounded-full p-3 transition-colors"><FaGithub size={20} /></Link>
                                    <Link href="https://www.linkedin.com/in/su-nge-nyeint-76a6052a1/" className="bg-blue-500 hover:bg-blue-400 rounded-full p-3 transition-colors"><FaLinkedin size={20} /></Link>
                                    <Link href="https://www.facebook.com/story.oo.9" className="bg-blue-500 hover:bg-blue-400 rounded-full p-3 transition-colors"><FaFacebook size={20} /></Link>
                                    <Link href="https://www.instagram.com/meepont123" className="bg-blue-500 hover:bg-blue-400 rounded-full p-3 transition-colors"><FaInstagram size={20} /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-10">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="John Doe"
                                        {...register("name")}
                                        disabled={loading}
                                    />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="john@example.com"
                                        {...register("email")}
                                        disabled={loading}
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Project Inquiry"
                                        {...register("subject")}
                                        disabled={loading}
                                    />
                                    {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Tell me about your project..."
                                        {...register("message")}
                                        disabled={loading}
                                    ></textarea>
                                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors disabled:opacity-60"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                                {status === "success" && (
                                    <div className="text-green-600 text-center font-semibold">Thank you! Your message has been sent.</div>
                                )}
                                {status === "error" && (
                                    <div className="text-red-600 text-center font-semibold">Something went wrong. Please try again.</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
