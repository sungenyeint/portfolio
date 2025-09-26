"use client";
import React, { useState, useEffect } from "react";

const message = "Loading Mee Pont's Portfolio...";

const PreloaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [fade, setFade] = useState(false);
    const [typed, setTyped] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    // Typing effect
    useEffect(() => {
        if (!loading) return;
        let i = 0;
        const type = () => {
            if (i <= message.length) {
                setTyped(message.slice(0, i));
                i++;
                setTimeout(type, 50);
            }
        };
        type();
    }, [loading]);

    // Blinking cursor
    useEffect(() => {
        if (!loading) return;
        const cursorInterval = setInterval(() => setShowCursor((c) => !c), 500);
        return () => clearInterval(cursorInterval);
    }, [loading]);

    // Fade out and hide after 10s
    useEffect(() => {
        const timer = setTimeout(() => setFade(true), 2500); // Start fade out at 9.5s
        const timer2 = setTimeout(() => setLoading(false), 3000); // Hide at 10s
        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    if (loading) {
        return (
            <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <span className="text-5xl font-bold text-black mb-6">&lt; /&gt;</span>
                <span className="text-xl md:text-2xl font-mono text-gray-500 tracking-wide">
                    {typed}
                    <span className="inline-block w-2" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
                </span>
            </div>
        );
    }

    return <>{children}</>;
};

export default PreloaderWrapper;
