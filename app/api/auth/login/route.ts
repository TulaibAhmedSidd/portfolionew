import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com' || 'tulluahsid@gmail.com';
        const adminPass = process.env.ADMIN_PASSWORD || 'admin123' || 'tulaib123';

        if (email === adminEmail && password === adminPass) {
            // Set a simple cookie or return a token
            // Since this is a simple portfolio, we'll return a success status and let the client handle state
            // Ideally, set an HttpOnly cookie for better security
            const response = NextResponse.json({ success: true, message: 'Login successful' });
            response.cookies.set('admin_token', 'authenticated', {
                httpOnly: false, // Allow client side access for simplicity in this specific request context 
                // or true if we want to secure it properly, but user asked for simple access. 
                // Let's stick to true for best practice and handle check via API or Server Components.
                // Wait, if I set httpOnly, I can't read it in useEffect easily without an API call.
                // I'll set it to false for now to allow simple client-side checks as requested ("make sure authentic user can access").
                // Actually, let's use a server action or API check for robustness.
                // But for now, httpOnly: false is easiest for the client to check document.cookie.
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });
            return response;
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
