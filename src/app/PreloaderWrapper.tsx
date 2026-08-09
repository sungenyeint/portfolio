"use client";
import React, { useState, useEffect, useRef } from "react";

const message = "Loading Mee Pont's Portfolio...";

const PreloaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);

  /* ---------------- INIT AUDIO ---------------- */

  useEffect(() => {
    audioRef.current = new Audio("/sounds/type.mp3");
    audioRef.current.volume = 0.2;
    audioRef.current.preload = "auto";
  }, []);

  /* ---------------- UNLOCK AUDIO ---------------- */

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current || unlockedRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          audioRef.current?.pause();
          audioRef.current!.currentTime = 0;
          unlockedRef.current = true;
        })
        .catch(() => {});

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  /* ---------------- TYPING EFFECT ---------------- */

  useEffect(() => {
    if (!loading) return;

    let i = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (i <= message.length) {
        setTyped(message.slice(0, i));

        if (
          audioRef.current &&
          unlockedRef.current &&
          message[i] !== " "
        ) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }

        i++;
        timeoutId = setTimeout(type, 50);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [loading]);

  /* ---------------- CURSOR BLINK ---------------- */

  useEffect(() => {
    if (!loading) return;
    const cursorInterval = setInterval(
      () => setShowCursor((c) => !c),
      500
    );
    return () => clearInterval(cursorInterval);
  }, [loading]);

  /* ---------------- FADE OUT ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2500);
    const timer2 = setTimeout(() => setLoading(false), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center
        transition-opacity duration-500
        ${fade ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <span className="text-5xl font-bold text-black mb-6">&lt; /&gt;</span>

        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl
          font-mono text-gray-500 tracking-wide text-center"
        >
          {typed}
          <span
            className="inline-block w-2"
            style={{ opacity: showCursor ? 1 : 0 }}
          >
            |
          </span>
        </span>

        <p className="mt-4 text-xs text-gray-400">
          Click anywhere to enable sound
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default PreloaderWrapper;
