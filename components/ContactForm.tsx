"use client";

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2 ml-1">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-2 ml-1">Subject</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Collaboration Opportunity"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-2 ml-1">Message</label>
                    <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                        disabled={loading}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : success ? (
                    "Message Sent!"
                ) : (
                    <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
            </button>

            {success && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm text-center"
                >
                    Thank you! I&apos;ll get back to you soon.
                </motion.p>
            )}
        </form>
    );
}
