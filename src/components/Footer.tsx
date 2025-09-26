import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold">Mee Pont</h2>
                        <p className="text-gray-400 dark:text-gray-300 mt-2">Web Developer & Music Enthusiast</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="https://github.com/sungenyeint" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors"><FaGithub size={30}/></Link>
                        <Link href="https://www.linkedin.com/in/su-nge-nyeint-76a6052a1/" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors"><FaLinkedin size={30}/></Link>
                        <Link href="https://www.facebook.com/story.oo.9" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors"><FaFacebook size={30} /></Link>
                        <Link href="https://www.instagram.com/meepont123" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-pink-400 transition-colors"><FaInstagram size={30} /></Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} Mee Pont. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
