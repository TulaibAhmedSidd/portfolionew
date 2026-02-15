"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/50 z-[99] pointer-events-none mix-blend-screen"
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    backgroundColor: isPointer ? "rgba(139, 92, 246, 0.2)" : "transparent"
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full z-[100] pointer-events-none"
                animate={{
                    x: mousePos.x - 3,
                    y: mousePos.y - 3,
                }}
                transition={{ type: 'spring', stiffness: 1000, damping: 40 }}
            />
        </>
    );
}
