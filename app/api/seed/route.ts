import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { PersonalInfo, About, Skill, Experience, Project, SocialLink, Achievement, Certification } from '@/models/Portfolio';

export async function GET() {
    try {
        await connectDB();

        // Personal Info
        const personalData = {
            name: 'Tulaib Ahmed Siddiqui',
            title: 'Senior Software Engineer | React.js | Next.js',
            email: 'tulluahsid@gmail.com',
            phone: '+92 305 2504520',
            location: 'Karachi, Pakistan',
            summary: 'A skilled software engineer with almost 5 years of experience. Passionate about creating intuitive and visually stunning user interfaces, dedicated to delivering high-quality and performant code.',
            resumeUrl: '/resume.pdf', // Placeholder for download
            profileImage: '/ME/profile.jpg',
        };

        // About
        const aboutData = {
            content: 'A skilled software engineer with almost 5 years of experience. Passionate about creating intuitive and visually stunning user interfaces, dedicated to delivering high-quality and performant code. Strong understanding of React.js, Next.js, Redux, JavaScript, HTML5, CSS3, and Tailwind CSS. Experienced in designing and implementing responsive, dynamic, and interactive user experiences.',
            subContent: 'I specialize in building high-performance web applications using modern technologies. My focus is always on user experience and code quality.',
            stats: [
                { label: 'Years Experience', value: '4.5+' },
                { label: 'Projects Completed', value: '20+' },
                { label: 'Satisfied Clients', value: '15+' },
            ]
        };

        // Skills
        const skillsData = [
            { name: 'React.js', level: 95, category: 'Frontend' },
            { name: 'Next.js', level: 90, category: 'Frontend' },
            { name: 'TypeScript', level: 85, category: 'Frontend' },
            { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
            { name: 'Redux Toolkit', level: 85, category: 'Frontend' },
            { name: 'Node.js', level: 80, category: 'Backend' },
            { name: 'MongoDB', level: 75, category: 'Backend' },
            { name: 'Three.js', level: 70, category: 'Creative' },
            { name: 'Framer Motion', level: 90, category: 'Creative' },
        ];

        // Experience
        const experienceData = [
            {
                company: 'Technyx Systems',
                position: 'Software Engineer',
                location: 'Karachi',
                startDate: 'Oct 2024',
                endDate: 'Present',
                description: [
                    'Developing Features: Building and maintaining functionalities for PractiCal, including meal plan creation, subscription management, and pausing dates between meals.',
                    'Implementing complex logic, ensuring seamless API integrations, and optimizing code for scalability and maintainability.',
                    'Leveraging Next.js 12, 13, and 14 for front-end and server-side rendering.'
                ]
            },
            {
                company: 'DataQ Health Pvt. Ltd / Wiseman Innovation LLC',
                position: 'Software Engineer',
                location: 'Karachi',
                startDate: 'Feb 2022',
                endDate: 'Oct 2024',
                description: [
                    'From scratch development of products like EMR, EHR and Patient Monitoring system.',
                    'Implementing responsive designs that work across multiple devices and browsers.',
                    'Ensuring the application is optimized for maximum speed and scalability.'
                ]
            }
        ];

        // Projects
        const projectsData = [
            {
                title: 'Electronic Health Record (EHR)',
                description: 'Implemented robust user management solutions, including user authentication, role-based access control, and user profile management.',
                tags: ['React', 'Next.js', 'Redux', 'MUI'],
                link: '#',
                featured: true
            },
            {
                title: 'Committee App',
                description: 'Comprehensive Committee Management Application to streamline committee creation, registration, and member management.',
                tags: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
                link: 'https://committeeapp.vercel.app',
                github: '#',
                featured: true
            },
            {
                title: 'Volton Solar Website',
                description: 'Dynamic e-commerce platform for Volton Solar, consisting of a user-facing website and a secure admin panel.',
                tags: ['React', 'Firebase', 'Tailwind'],
                link: 'https://voltonsolar.pk',
                featured: true
            }
        ];

        // Social Links
        const socialLinksData = [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/tulaibsiddiqui' },
            { platform: 'GitHub', url: 'https://github.com/tulaibsiddiqui' },
            { platform: 'Portfolio', url: '#' },
        ];

        // Achievements
        const achievementsData = [
            { title: 'Ignite Funding', description: 'Obtained funding from IGNITE for FYP with a COVID-19 use case.', date: '2022' },
            { title: 'DUHS-DICE Exhibition Pakistan', description: 'Presented FYP, receiving positive feedback and appreciation.', date: '2022' },
        ];

        // Certifications
        const certificationsData = [
            { title: 'Web and Mobile Hybrid App Development', issuer: 'SMIT - Saylani', date: '2021' },
            { title: 'MTA: Introduction to Programming using HTML and CSS', issuer: 'Microsoft', date: '2021' },
            { title: 'Python Development', issuer: 'SMIT - Saylani', date: '2022' },
        ];

        // Upsert All
        await PersonalInfo.findOneAndUpdate({}, personalData, { upsert: true });
        await About.findOneAndUpdate({}, aboutData, { upsert: true });

        await Skill.deleteMany({});
        await Skill.insertMany(skillsData);

        await Experience.deleteMany({});
        await Experience.insertMany(experienceData);

        await Project.deleteMany({});
        await Project.insertMany(projectsData);

        await SocialLink.deleteMany({});
        await SocialLink.insertMany(socialLinksData);

        await Achievement.deleteMany({});
        await Achievement.insertMany(achievementsData);

        await Certification.deleteMany({});
        await Certification.insertMany(certificationsData);

        return NextResponse.json({ message: 'Seed successful with Achievements and Certifications' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
