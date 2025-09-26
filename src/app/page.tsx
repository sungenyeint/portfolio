import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
// import Services from "@/components/Services";
import Skill from "@/components/Skill";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* About Me */}
            <About />

            {/* Skills */}
            <Skill />

            {/* Services */}
            {/* <Services /> */}

            {/* Experience */}
            <Experience />

            {/* Projects */}
            <Projects />

            {/* Contact */}
            <Contact />
        </>
    );
}
