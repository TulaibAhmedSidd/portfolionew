import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Skill } from '@/models/Portfolio';

export async function GET() {
    try {
        await connectDB();
        const skills = await Skill.find().sort({ category: 1, level: -1 });
        return NextResponse.json(skills);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();
        const skill = await Skill.create(data);
        return NextResponse.json(skill, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
