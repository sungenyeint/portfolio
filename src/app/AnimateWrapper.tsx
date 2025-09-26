"use client";

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimateWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0.3, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
