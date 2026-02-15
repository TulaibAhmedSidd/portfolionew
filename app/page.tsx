"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Cpu, Layout, Server, Database, Award, BookOpen } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const skillCategories = [
    { name: 'Frontend', icon: <Layout className="text-accent" /> },
    { name: 'Backend', icon: <Server className="text-accent" /> },
    { name: 'Creative', icon: <Cpu className="text-accent" /> },
    { name: 'Tools', icon: <Database className="text-accent" /> },
  ];

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch content:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-accent animate-pulse text-xl font-bold">Loading Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />

      <Hero personal={data.personal} />

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass-panel relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent z-10" />
              {data.personal?.profileImage ? (
                <Image
                  src={data.personal.profileImage}
                  alt={data.personal.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center p-12">
                  <div className="w-full h-full border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                    <Cpu size={64} className="mb-4 animate-pulse" />
                    <p className="text-sm text-center">Place profile.jpg in /public/ME/</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 blur-3xl rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full -z-10" />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Pioneering <span className="text-accent">Digital</span> Solutions
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {data.about?.content || "Passionate about building scalable web applications with a focus on user experience and clean code."}
            </p>
            <div className="grid grid-cols-3 gap-6">
              {data.about?.stats?.map((stat: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 uppercase tracking-tighter">{stat.label}</div>
                </div>
              ))}
            </div>
            {data.personal?.resumeUrl && (
              <div className="mt-10">
                <a
                  href={data.personal.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all"
                >
                  Download Full CV <ExternalLink size={18} />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Featured Work</h2>
              <p className="text-slate-400 max-w-xl">A selection of my recent projects, blending technical excellence with creative design.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-accent hover:underline mb-2">
              All Projects <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects?.map((project: any, i: number) => (
              <ProjectCard key={project?._id || i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Tech Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, i) => (
            <div key={i} className="glass-card p-8">
              <div className="mb-6">{cat.icon}</div>
              <h3 className="text-xl font-bold mb-6">{cat.name}</h3>
              <div className="flex flex-wrap gap-3">
                {data.skills?.filter((s: any) => s.category === cat.name).map((skill: any, j: number) => (
                  <span key={j} className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/5 hover:border-accent/50 transition-colors">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Experience</h2>
          <div className="space-y-12">
            {data.experiences?.map((exp: any, i: number) => (
              <div key={i} className="relative pl-8 border-l border-accent/30 group">
                <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                    <div className="text-accent font-medium">{exp.company}</div>
                  </div>
                  <div className="text-slate-500 text-sm">{exp.startDate} — {exp.endDate}</div>
                </div>
                <div className="text-slate-400 leading-relaxed list-disc list-inside space-y-2">
                  {exp.description?.map((desc: string, k: number) => (
                    <p key={k}>• {desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section id="achievements" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
              <Award className="text-accent" /> Achievements
            </h2>
            <div className="space-y-8">
              {data.achievements?.map((ach: any, i: number) => (
                <div key={i} className="glass-card p-6 border-l-4 border-accent">
                  <h3 className="text-xl font-bold mb-2">{ach.title}</h3>
                  <p className="text-slate-400 text-sm mb-2">{ach.description}</p>
                  <span className="text-accent text-xs font-mono">{ach.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
              <BookOpen className="text-accent" /> Certifications
            </h2>
            <div className="space-y-8">
              {data.certifications?.map((cert: any, i: number) => (
                <div key={i} className="glass-card p-6 hover:bg-white/5 transition-all">
                  <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                  <div className="text-slate-300 text-sm mb-2">{cert.issuer}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs">{cert.date}</span>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-accent text-xs hover:underline">
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Let&apos;s build something <span className="text-accent">extraordinary</span>.</h2>
              <p className="text-slate-400 mb-12 text-lg">
                I&apos;m currently available for freelance projects and full-time opportunities. Reach out and let&apos;s start a conversation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                    <Mail className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Email</div>
                    <div className="text-xl font-medium">{data.personal?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                    <Phone className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Phone</div>
                    <div className="text-xl font-medium">{data.personal?.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                    <MapPin className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Location</div>
                    <div className="text-xl font-medium">{data.personal?.location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                {data.socials?.map((social: any, i: number) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="p-4 glass-card hover:bg-white/10 transition-all">
                    {social.platform === 'LinkedIn' ? <Linkedin /> : <Github />}
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 md:p-12 rounded-3xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Tulaib Ahmed Siddiqui. Built with Next.js, Three.js and Passion.
      </footer>
    </div>
  );
}
