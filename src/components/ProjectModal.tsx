"use client";

import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Project {
  title: string;
  description: string;
  detail: string;
  technologies: string[];
  images: string[];
  link: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const AUTO_SLIDE_DELAY = 3000;
const SWIPE_CONFIDENCE = 8000;

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [paused, setPaused] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  /* ---------------- ACCESSIBILITY ---------------- */

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fullscreen ? setFullscreen(false) : onClose();
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [fullscreen]);

  /* ---------------- AUTO SLIDE ---------------- */

  useEffect(() => {
    if (!isOpen || fullscreen || paused || !project) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImage((i) => (i + 1) % project.images.length);
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(timer);
  }, [isOpen, fullscreen, paused, project]);

  if (!isOpen || !project) return null;

  /* ---------------- NAVIGATION ---------------- */

  const next = () => {
    setDirection(1);
    setCurrentImage((i) => (i + 1) % project.images.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentImage((i) =>
      (i - 1 + project.images.length) % project.images.length
    );
  };

  const goTo = (index: number) => {
    setDirection(index > currentImage ? 1 : -1);
    setCurrentImage(index);
  };

  /* ---------------- SWIPE ---------------- */

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipe = info.offset.x * info.velocity.x;
    if (swipe < -SWIPE_CONFIDENCE) next();
    if (swipe > SWIPE_CONFIDENCE) prev();
  };

  /* ---------------- SLIDE VARIANTS ---------------- */

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* MODAL */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-3xl w-full mx-4 rounded-2xl p-8
                       bg-white/10 dark:bg-neutral-900/30
                       backdrop-blur-xl border border-white/20
                       shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="absolute top-1 right-1 w-8 h-8"
            >
              ✕
            </button>

            {/* SLIDER */}
            <div
              className="relative h-56 md:h-64 overflow-hidden rounded-lg mb-4"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentImage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 260, damping: 28 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/projects/${project.images[currentImage]}`}
                    alt={`${project.title} screenshot ${currentImage + 1}`}
                    fill
                    className="object-cover cursor-zoom-in"
                    onClick={() => setFullscreen(true)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Arrows */}
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
              >
                ◀
              </button>

              <button
                onClick={next}
                aria-label="Next image"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
              >
                ▶
              </button>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mb-6">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`w-3 h-3 rounded-full transition
                    ${
                      i === currentImage
                        ? "bg-white scale-110"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                />
              ))}
            </div>

            {/* CONTENT */}
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-200 mb-4">{project.description}</p>
            <p className="text-gray-300 text-sm mb-6">{project.detail}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-white/20 border border-white/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Visit Project
            </a>
          </motion.div>

          {/* FULLSCREEN */}
          <AnimatePresence>
            {fullscreen && (
              <motion.div
                className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreen(false)}
              >
                <Image
                  src={`/projects/${project.images[currentImage]}`}
                  alt="Fullscreen image"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
