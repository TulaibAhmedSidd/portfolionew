"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
    FiUser, FiFileText, FiBriefcase, FiZap, FiAward,
    FiCheckCircle, FiShare2, FiSave, FiPlus, FiTrash2, FiRefreshCcw
} from "react-icons/fi";

type TabType = "personal" | "about" | "projects" | "experiences" | "skills" | "achievements" | "certifications" | "socials";

export default function AdminPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState<TabType>("personal");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        // Build a simple check if we are already authenticated via cookie?
        // For simplicity in this demo, we'll require login on refresh unless we verify cookie.
        // Let's keep it simple: always ask for login on refresh for maximum security demo, 
        // or check if we made a successful request previously.
        // The user asked "make sure authentic user can access admin ask for email and passworrd".
        // So a login screen is the priority.
        setLoading(false);
    }, []);

    const fetchContent = () => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchContent();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginCreds),
            });
            const data = await res.json();
            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                setLoginError(data.message || "Login failed");
            }
        } catch (err) {
            setLoginError("An error occurred. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
                <Navbar />

                {/* 3D Background effect for login too */}
                <div className="absolute inset-0 -z-10 bg-[#020617] opacity-50" />

                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent mb-2">Admin Access</h1>
                        <p className="text-slate-400 text-sm">Enter your credentials to manage the portfolio.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email / Username</label>
                            <input
                                type="text"
                                value={loginCreds.email}
                                onChange={(e) => setLoginCreds({ ...loginCreds, email: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all text-white"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
                            <input
                                type="password"
                                value={loginCreds.password}
                                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all text-white"
                                placeholder="••••••••"
                            />
                        </div>

                        {loginError && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-accent hover:bg-accent/80 rounded-xl font-bold transition-all shadow-lg hover:shadow-accent/25"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading || !data) return <div className="p-24 text-center text-white">Loading Admin Data...</div>;


    const handleUpdate = async (type: string, payload: any) => {
        setMessage("Updating...");
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [type]: payload }),
            });
            if (res.ok) setMessage("Update successful!");
            else setMessage("Update failed.");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Error occurred.");
        }
    };

    const handleSeed = async () => {
        if (!confirm("Are you sure? This will overwrite all current data with the default resume content.")) return;
        setMessage("Seeding...");
        try {
            const res = await fetch("/api/seed");
            const json = await res.json();
            setMessage(json.message);
            // Refresh data
            const resData = await fetch("/api/content");
            const jsonData = await resData.json();
            setData(jsonData);
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Seed failed.");
        }
    };

    const addItem = (key: string, defaultItem: any) => {
        const newData = { ...data };
        if (!newData[key]) newData[key] = [];
        newData[key] = [defaultItem, ...newData[key]];
        setData(newData);
    };

    const removeItem = (key: string, index: number) => {
        const newData = { ...data };
        newData[key] = newData[key].filter((_: any, i: number) => i !== index);
        setData(newData);
    };

    const updateItem = (key: string, index: number, field: string, value: any) => {
        const newData = { ...data };
        newData[key][index] = { ...newData[key][index], [field]: value };
        setData(newData);
    };

    if (loading) return <div className="p-24 text-center">Loading Admin...</div>;

    const tabs: { id: TabType; label: string; icon: any }[] = [
        { id: "personal", label: "Personal", icon: <FiUser /> },
        { id: "about", label: "About", icon: <FiFileText /> },
        { id: "projects", label: "Projects", icon: <FiBriefcase /> },
        { id: "experiences", label: "Experience", icon: <FiZap /> },
        { id: "skills", label: "Skills", icon: <FiCheckCircle /> },
        { id: "achievements", label: "Achievements", icon: <FiAward /> },
        { id: "certifications", label: "Certs", icon: <FiAward /> },
        { id: "socials", label: "Social", icon: <FiShare2 /> },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto pt-32 px-6 pb-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-400 mt-2">Manage your portfolio content in real-time.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleSeed}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-white/10 rounded-xl hover:bg-slate-800 transition-all text-sm"
                        >
                            <FiRefreshCcw /> Reset Data
                        </button>
                        <button
                            onClick={() => handleUpdate(activeTab, data[activeTab])}
                            className="flex items-center gap-2 px-8 py-3 bg-accent rounded-xl font-bold hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] transition-all"
                        >
                            <FiSave /> Save Changes
                        </button>
                    </div>
                </div>

                {message && (
                    <div className="fixed top-24 right-6 z-50 p-4 bg-accent/20 border border-accent/50 rounded-xl text-accent backdrop-blur-md animate-in fade-in slide-in-from-top-4">
                        {message}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {tab.icon}
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 glass-panel rounded-3xl p-8 border border-white/5 bg-white/5 backdrop-blur-sm">

                        {/* Personal Info */}
                        {activeTab === "personal" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 italic">
                                    <FiUser className="text-accent" /> Personal Information
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Field label="Full Name" value={data.personal?.name} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, name: v } })} />
                                    <Field label="Job Title" value={data.personal?.title} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, title: v } })} />
                                    <Field label="Email" value={data.personal?.email} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, email: v } })} />
                                    <Field label="Phone" value={data.personal?.phone} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, phone: v } })} />
                                    <Field label="Location" value={data.personal?.location} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, location: v } })} />
                                    <Field label="Resume URL" value={data.personal?.resumeUrl} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, resumeUrl: v } })} />
                                    <Field label="Profile Image URL" value={data.personal?.profileImage} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, profileImage: v } })} />
                                </div>
                                <TextArea label="Summary" value={data.personal?.summary} onChange={(v: string) => setData({ ...data, personal: { ...data.personal, summary: v } })} />
                            </div>
                        )}

                        {/* About */}
                        {activeTab === "about" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6 italic">About Section</h2>
                                <TextArea label="Main Content" value={data.about?.content} onChange={(v: string) => setData({ ...data, about: { ...data.about, content: v } })} />
                                <TextArea label="Sub Content" value={data.about?.subContent} onChange={(v: string) => setData({ ...data, about: { ...data.about, subContent: v } })} />

                                <div className="mt-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold">Stats</h3>
                                        <button onClick={() => {
                                            const stats = [...(data.about?.stats || [])];
                                            stats.push({ label: "", value: "" });
                                            setData({ ...data, about: { ...data.about, stats } });
                                        }} className="text-accent text-sm flex items-center gap-1"><FiPlus /> Add Stat</button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {data.about?.stats?.map((stat: any, i: number) => (
                                            <div key={i} className="flex gap-2 items-end">
                                                <Field label="Label" value={stat.label} onChange={(v: string) => {
                                                    const stats = [...data.about.stats];
                                                    stats[i].label = v;
                                                    setData({ ...data, about: { ...data.about, stats } });
                                                }} />
                                                <Field label="Value" value={stat.value} onChange={(v: string) => {
                                                    const stats = [...data.about.stats];
                                                    stats[i].value = v;
                                                    setData({ ...data, about: { ...data.about, stats } });
                                                }} />
                                                <button onClick={() => {
                                                    const stats = data.about.stats.filter((_: any, idx: number) => idx !== i);
                                                    setData({ ...data, about: { ...data.about, stats } });
                                                }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg mb-1"><FiTrash2 /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {activeTab === "projects" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold italic">Projects</h2>
                                    <button onClick={() => addItem('projects', { title: "New Project", description: "", tags: [], featured: false })} className="bg-accent/20 text-accent px-4 py-2 rounded-xl flex items-center gap-2"><FiPlus /> Add Project</button>
                                </div>
                                <div className="space-y-6">
                                    {data.projects?.map((item: any, i: number) => (
                                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group">
                                            <button onClick={() => removeItem('projects', i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"><FiTrash2 /></button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Field label="Title" value={item.title} onChange={(v: string) => updateItem('projects', i, 'title', v)} />
                                                <Field label="Image URL" value={item.image} onChange={(v: string) => updateItem('projects', i, 'image', v)} />
                                                <Field label="Live Link" value={item.link} onChange={(v: string) => updateItem('projects', i, 'link', v)} />
                                                <Field label="GitHub Link" value={item.github} onChange={(v: string) => updateItem('projects', i, 'github', v)} />
                                                <div className="col-span-2">
                                                    <Field label="Tags (comma separated)" value={item.tags?.join(', ')} onChange={(v: string) => updateItem('projects', i, 'tags', v.split(',').map((t: string) => t.trim()))} />
                                                </div>
                                                <div className="col-span-2">
                                                    <TextArea label="Description" value={item.description} onChange={(v: string) => updateItem('projects', i, 'description', v)} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" checked={item.featured} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem('projects', i, 'featured', e.target.checked)} id={`feat-${i}`} className="w-4 h-4 accent-accent" />
                                                    <label htmlFor={`feat-${i}`} className="text-sm text-slate-400">Featured Project</label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Experience */}
                        {activeTab === "experiences" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold italic">Experience</h2>
                                    <button onClick={() => addItem('experiences', { company: "Company Name", position: "Role", startDate: "2024", description: [] })} className="bg-accent/20 text-accent px-4 py-2 rounded-xl flex items-center gap-2"><FiPlus /> Add Experience</button>
                                </div>
                                <div className="space-y-6">
                                    {(data.experiences || []).map((item: any, i: number) => (
                                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative">
                                            <button onClick={() => removeItem('experiences', i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500"><FiTrash2 /></button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Field label="Company" value={item.company} onChange={(v: string) => updateItem('experiences', i, 'company', v)} />
                                                <Field label="Position" value={item.position} onChange={(v: string) => updateItem('experiences', i, 'position', v)} />
                                                <Field label="Start Date" value={item.startDate} onChange={(v: string) => updateItem('experiences', i, 'startDate', v)} />
                                                <Field label="End Date" value={item.endDate} onChange={(v: string) => updateItem('experiences', i, 'endDate', v)} />
                                                <div className="col-span-2">
                                                    <TextArea label="Description (one per line)" value={item.description?.join('\n')} onChange={(v: string) => updateItem('experiences', i, 'description', v.split('\n').filter((l: string) => l.trim()))} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {activeTab === "skills" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold italic">Skills</h2>
                                    <button onClick={() => addItem('skills', { name: "New Skill", level: 80, category: "Frontend" })} className="bg-accent/20 text-accent px-4 py-2 rounded-xl flex items-center gap-2"><FiPlus /> Add Skill</button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {(data.skills || []).map((item: any, i: number) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-center">
                                            <div className="flex-1 space-y-2">
                                                <Field label="Skill Name" value={item.name} onChange={(v: string) => updateItem('skills', i, 'name', v)} />
                                                <div className="flex gap-2">
                                                    <Field label="Level (0-100)" type="number" value={item.level} onChange={(v: string) => updateItem('skills', i, 'level', parseInt(v))} />
                                                    <Field label="Category" value={item.category} onChange={(v: string) => updateItem('skills', i, 'category', v)} />
                                                </div>
                                            </div>
                                            <button onClick={() => removeItem('skills', i)} className="text-slate-500 hover:text-red-500"><FiTrash2 /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Achievements */}
                        {activeTab === "achievements" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold italic">Achievements</h2>
                                    <button onClick={() => addItem('achievements', { title: "Title", date: "2024" })} className="bg-accent/20 text-accent px-4 py-2 rounded-xl flex items-center gap-2"><FiPlus /> Add Achievement</button>
                                </div>
                                <div className="space-y-4">
                                    {(data.achievements || []).map((item: any, i: number) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl relative">
                                            <button onClick={() => removeItem('achievements', i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500"><FiTrash2 /></button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Field label="Title" value={item.title} onChange={(v: string) => updateItem('achievements', i, 'title', v)} />
                                                <Field label="Date" value={item.date} onChange={(v: string) => updateItem('achievements', i, 'date', v)} />
                                                <div className="col-span-2">
                                                    <TextArea label="Description" value={item.description} onChange={(v: string) => updateItem('achievements', i, 'description', v)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certifications */}
                        {activeTab === "certifications" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold italic">Certifications</h2>
                                    <button onClick={() => addItem('certifications', { title: "Title", issuer: "Issuer" })} className="bg-accent/20 text-accent px-4 py-2 rounded-xl flex items-center gap-2"><FiPlus /> Add Cert</button>
                                </div>
                                <div className="space-y-4">
                                    {(data.certifications || []).map((item: any, i: number) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl relative">
                                            <button onClick={() => removeItem('certifications', i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500"><FiTrash2 /></button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Field label="Title" value={item.title} onChange={(v: string) => updateItem('certifications', i, 'title', v)} />
                                                <Field label="Issuer" value={item.issuer} onChange={(v: string) => updateItem('certifications', i, 'issuer', v)} />
                                                <Field label="Date" value={item.date} onChange={(v: string) => updateItem('certifications', i, 'date', v)} />
                                                <Field label="Link" value={item.link} onChange={(v: string) => updateItem('certifications', i, 'link', v)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {activeTab === "socials" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold italic">Social Links</h2>
                                    <button onClick={() => addItem('socials', { platform: "GitHub", url: "" })} className="bg-accent/20 text-accent px-4 py-2 rounded-xl flex items-center gap-2"><FiPlus /> Add Social</button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {(data.socials || []).map((item: any, i: number) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-center">
                                            <div className="flex-1 flex gap-2">
                                                <Field label="Platform" value={item.platform} onChange={(v: string) => updateItem('socials', i, 'platform', v)} />
                                                <Field label="URL" value={item.url} onChange={(v: string) => updateItem('socials', i, 'url', v)} />
                                            </div>
                                            <button onClick={() => removeItem('socials', i)} className="text-slate-500 hover:text-red-500"><FiTrash2 /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <style jsx global>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                :root {
                    --accent: 79, 70, 229;
                    --accent-rgb: 79, 70, 229;
                }
            `}</style>
        </div>
    );
}

function Field({ label, value, onChange, type = "text" }: { label: string, value: any, onChange: (v: string) => void, type?: string }) {
    return (
        <div className="w-full">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>
            <input
                type={type}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function TextArea({ label, value, onChange }: { label: string, value: any, onChange: (v: string) => void }) {
    return (
        <div className="w-full">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>
            <textarea
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all resize-none"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
