"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 border-2 border-accent rounded-2xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: [0, -180, -360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-24 h-24 border-2 border-primary rounded-2xl"
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xl font-bold tracking-widest text-white uppercase"
            >
                Initialising Intel<span className="text-accent">.</span>
            </motion.div>
        </motion.div>
    );
}
