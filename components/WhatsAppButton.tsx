"use client";

import { useEffect, useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';

export default function WhatsAppButton() {
    const [phone, setPhone] = useState<string>('');

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.personal?.phone) {
                    // Remove non-numeric characters for the link
                    const cleanPhone = data.personal.phone.replace(/\D/g, '');
                    setPhone(cleanPhone);
                }
            })
            .catch(err => console.error("Failed to fetch phone number", err));
    }, []);

    if (!phone) return null;

    return (
        <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
            title="Chat on WhatsApp"
        >
            <SiWhatsapp size={24} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap text-sm font-bold">
                Chat on WhatsApp
            </span>
        </a>
    );
}
