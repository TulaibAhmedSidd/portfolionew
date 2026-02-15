"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const titles = [
    "Senior Software Engineer",
    "Frontend Expert",
    "Next.js Enthusiast",
    "Creative Developer",
    "AI Engineer"
];

export default function Hero({ personal }: { personal: any }) {
    const [titleIndex, setTitleIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const currentTitle = titles[titleIndex];
            if (isDeleting) {
                setText(currentTitle.substring(0, text.length - 1));
                setSpeed(50);
            } else {
                setText(currentTitle.substring(0, text.length + 1));
                setSpeed(150);
            }

            if (!isDeleting && text === currentTitle) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setTitleIndex((prev) => (prev + 1) % titles.length);
            }
        };

        const timer = setTimeout(handleType, speed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, titleIndex, speed]);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                <span className="text-accent font-medium tracking-widest uppercase mb-4 block">
                    Welcome to my digital universe
                </span>
                <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                    {personal?.name || "Tulaib Ahmed"}
                </h1>
                <div className="h-12 md:h-16 flex items-center justify-center">
                    <p className="text-xl md:text-3xl font-light text-slate-300">
                        I am a <span className="text-accent font-mono border-r-2 border-accent pr-1">{text}</span>
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 flex flex-wrap gap-6 justify-center"
                >
                    <a href="#projects" className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95">
                        View Projects
                    </a>
                    <a href="#contact" className="px-8 py-3 rounded-full border border-white/20 backdrop-blur-md hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95">
                        Contact Me
                    </a>
                    {personal?.resumeUrl && (
                        <a
                            href={personal.resumeUrl}
                            download
                            className="px-8 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/80 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            Download Resume
                        </a>
                    )}
                </motion.div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
}
