"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Scene = dynamic(() => import('@/three/Scene'), { ssr: false });

export default function Background3D() {
    const [isMobile, setIsMobile] = useState(false);
    const [lowPerf, setLowPerf] = useState(false);

    useEffect(() => {
        // Basic check for low performance devices
        if (typeof window !== "undefined") {
            const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            setIsMobile(mobileCheck);

            const lowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
            const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

            if (mobileCheck || lowMemory || lowCores) {
                setLowPerf(true);
            }
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 -z-10 bg-[#020617]"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
            <div className="absolute inset-0">
                <Scene isMobile={isMobile} />
            </div>
        </motion.div>
    );
}
