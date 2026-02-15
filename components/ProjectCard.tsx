"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export default function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden group"
        >
            <div className="relative h-64 overflow-hidden">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    // <Image
                    //     src={project.image}
                    //     alt={project.title}
                    //     fill
                    //     className="object-cover transition-transform duration-500 group-hover:scale-110"
                    // />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <span className="text-slate-500 text-lg">{project.title}</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                            <Github size={20} />
                        </a>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
