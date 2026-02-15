import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import {
    PersonalInfo,
    About,
    SocialLink,
    Project,
    Experience,
    Skill,
    Achievement,
    Certification
} from '@/models/Portfolio';

export async function GET() {
    try {
        await connectDB();
        const [personal, about, socials, projects, experiences, skills, achievements, certifications] = await Promise.all([
            PersonalInfo.findOne(),
            About.findOne(),
            SocialLink.find(),
            Project.find().sort({ createdAt: -1 }),
            Experience.find().sort({ startDate: -1 }),
            Skill.find(),
            Achievement.find().sort({ date: -1 }),
            Certification.find().sort({ date: -1 }),
        ]);

        return NextResponse.json({
            personal,
            about,
            socials,
            projects,
            experiences,
            skills,
            achievements,
            certifications,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        if (data.personal) {
            await PersonalInfo.findOneAndUpdate({} as any, data.personal, { upsert: true, new: true } as any);
        }
        if (data.about) {
            await About.findOneAndUpdate({} as any, data.about, { upsert: true, new: true } as any);
        }

        // For arrays, reconcile based on the provided data
        if (data.projects) {
            await Project.deleteMany({});
            await Project.insertMany(data.projects);
        }
        if (data.experiences) {
            await Experience.deleteMany({});
            await Experience.insertMany(data.experiences);
        }
        if (data.skills) {
            await Skill.deleteMany({});
            await Skill.insertMany(data.skills);
        }
        if (data.achievements) {
            await Achievement.deleteMany({});
            await Achievement.insertMany(data.achievements);
        }
        if (data.certifications) {
            await Certification.deleteMany({});
            await Certification.insertMany(data.certifications);
        }
        if (data.socials) {
            await SocialLink.deleteMany({});
            await SocialLink.insertMany(data.socials);
        }

        return NextResponse.json({ message: 'Content updated successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
