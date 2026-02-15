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
            {
                "_id": "6991b9dc50fea8e267b7bdf1",
                "name": "React Fiber",
                "level": 80,
                "category": "Creative",
                "__v": 0,
                "createdAt": "2026-02-15T12:19:40.094Z",
                "updatedAt": "2026-02-15T12:19:40.094Z"
            },
            {
                "_id": "6991b9dc50fea8e267b7bdf2",
                "name": "PHP Laravel",
                "level": 70,
                "category": "Backend",
                "__v": 0,
                "createdAt": "2026-02-15T12:19:40.094Z",
                "updatedAt": "2026-02-15T12:19:40.094Z"
            },
            {
                "_id": "6991b9dc50fea8e267b7bdf3",
                "name": "TypeScript",
                "level": 90,
                "category": "Frontend",
                "__v": 0,
                "createdAt": "2026-02-15T12:19:40.094Z",
                "updatedAt": "2026-02-15T12:19:40.094Z"
            },
            {
                "_id": "6991b9dc50fea8e267b7bdf4",
                "name": "VS Code",
                "level": 80,
                "category": "Tools",
                "__v": 0,
                "createdAt": "2026-02-15T12:19:40.094Z",
                "updatedAt": "2026-02-15T12:19:40.094Z"
            },
            {
                "_id": "6991b9dc50fea8e267b7bdf5",
                "name": "Antigravity",
                "level": 80,
                "category": "Tools",
                "__v": 0,
                "createdAt": "2026-02-15T12:19:40.094Z",
                "updatedAt": "2026-02-15T12:19:40.094Z"
            },
            {
                "_id": "6991b7af9f6473f89ff8a73d",
                "name": "React.js",
                "level": 95,
                "category": "Frontend",
                "createdAt": "2026-02-15T12:10:23.877Z",
                "updatedAt": "2026-02-15T12:10:23.877Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a73e",
                "name": "Next.js",
                "level": 90,
                "category": "Frontend",
                "createdAt": "2026-02-15T12:10:23.878Z",
                "updatedAt": "2026-02-15T12:10:23.878Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a73f",
                "name": "TypeScript",
                "level": 85,
                "category": "Frontend",
                "createdAt": "2026-02-15T12:10:23.878Z",
                "updatedAt": "2026-02-15T12:10:23.878Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a740",
                "name": "Tailwind CSS",
                "level": 95,
                "category": "Frontend",
                "createdAt": "2026-02-15T12:10:23.878Z",
                "updatedAt": "2026-02-15T12:10:23.878Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a741",
                "name": "Redux Toolkit",
                "level": 85,
                "category": "Frontend",
                "createdAt": "2026-02-15T12:10:23.878Z",
                "updatedAt": "2026-02-15T12:10:23.878Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a742",
                "name": "Node.js",
                "level": 80,
                "category": "Backend",
                "createdAt": "2026-02-15T12:10:23.879Z",
                "updatedAt": "2026-02-15T12:10:23.879Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a743",
                "name": "MongoDB",
                "level": 75,
                "category": "Backend",
                "createdAt": "2026-02-15T12:10:23.879Z",
                "updatedAt": "2026-02-15T12:10:23.879Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a744",
                "name": "Three.js",
                "level": 70,
                "category": "Creative",
                "createdAt": "2026-02-15T12:10:23.879Z",
                "updatedAt": "2026-02-15T12:10:23.879Z",
                "__v": 0
            },
            {
                "_id": "6991b7af9f6473f89ff8a745",
                "name": "Framer Motion",
                "level": 90,
                "category": "Creative",
                "createdAt": "2026-02-15T12:10:23.879Z",
                "updatedAt": "2026-02-15T12:10:23.879Z",
                "__v": 0
            }
        ]

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
                "_id": "6991b98c50fea8e267b7bdeb",
                "title": "Revenue Cycle Management (EHR)",
                "description": "Implemented robust revenue cycel management solutions, including user authentication, role-based access control, and user profile management.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQn3pmeZRYP8ZjG9d2WzDthsseC80fEd3Uw&s",
                "tags": [
                    "React",
                    "Next.js",
                    "Redux",
                    "MUI"
                ],
                "link": "#",
                "featured": true,
                "__v": 0,
                "createdAt": "2026-02-15T12:18:20.139Z",
                "updatedAt": "2026-02-15T12:18:20.139Z"
            },
            {
                "_id": "6991b98c50fea8e267b7bdea",
                "title": "PractiCal",
                "description": "I developed a complete daily meal subscription platform for PractiCal (practical.me), implementing secure user authentication with role-based access control, user profile management, and a fully interactive dashboard where customers can create, manage, pause, and customize their meal plans. I built scalable REST APIs with MongoDB and integrated multiple payment gateways including Stripe, Paymob, and Tabby to support secure subscriptions and flexible checkout. The system includes both user and admin portals, ensuring smooth meal scheduling, subscription control, and business management in a production-ready environment.",
                "image": "https://assets.practical.me/public/thumb/oc-image.png",
                "tags": [
                    "React",
                    "Next.js",
                    "Redux",
                    "MUI",
                    "PHP-Laravel"
                ],
                "link": "https://practical.me/",
                "featured": true,
                "__v": 0,
                "createdAt": "2026-02-15T12:18:20.138Z",
                "updatedAt": "2026-02-15T12:18:20.138Z"
            },
            {
                "_id": "6991b7b09f6473f89ff8a74c",
                "title": "Electronic Health Record (EHR)",
                "description": "Implemented robust user management solutions, including user authentication, role-based access control, and user profile management.",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikH7thHBtSVok3UTm-35yzZPjR4SKgZJdQg&s",
                "tags": [
                    "React",
                    "Next.js",
                    "Redux",
                    "MUI"
                ],
                "link": "#",
                "featured": true,
                "createdAt": "2026-02-15T12:10:24.664Z",
                "updatedAt": "2026-02-15T12:10:24.664Z",
                "__v": 0
            },
            {
                "_id": "6991b7b09f6473f89ff8a74d",
                "title": "Committee App",
                "description": "Comprehensive Committee Management Application to streamline committee creation, registration, and member management.",
                "image": "https://img.freepik.com/free-vector/politician-sitting-round-table-boardroom-board-directors-with-ceo-holding-formal-talk-office-room-flat-vector-illustration-business-authority-corporate-leader-planning-strategy-concept_74855-22013.jpg?semt=ais_hybrid&w=740&q=80",
                "tags": [
                    "Next.js",
                    "Node.js",
                    "Express",
                    "MongoDB"
                ],
                "link": "https://committeeapp.vercel.app",
                "github": "#",
                "featured": true,
                "createdAt": "2026-02-15T12:10:24.664Z",
                "updatedAt": "2026-02-15T12:10:24.664Z",
                "__v": 0
            },
            {
                "_id": "6991b7b09f6473f89ff8a74e",
                "title": "Volton Solar Website",
                "description": "Dynamic e-commerce platform for Volton Solar, consisting of a user-facing website and a secure admin panel.",
                "image": "https://voltonsolar.com/images/voltonLogo.png",
                "tags": [
                    "React",
                    "Firebase",
                    "Tailwind"
                ],
                "link": "https://voltonsolar.pk",
                "featured": true,
                "createdAt": "2026-02-15T12:10:24.664Z",
                "updatedAt": "2026-02-15T12:10:24.664Z",
                "__v": 0
            }
        ]
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
        await PersonalInfo.findOneAndUpdate({} as any, personalData, { upsert: true } as any);
        await About.findOneAndUpdate({} as any, aboutData, { upsert: true } as any);

        await Skill.deleteMany({});
        await Skill.insertMany(skillsData as any);

        await Experience.deleteMany({});
        await Experience.insertMany(experienceData as any);

        await Project.deleteMany({});
        await Project.insertMany(projectsData as any);

        await SocialLink.deleteMany({});
        await SocialLink.insertMany(socialLinksData as any);

        await Achievement.deleteMany({});
        await Achievement.insertMany(achievementsData as any);

        await Certification.deleteMany({});
        await Certification.insertMany(certificationsData as any);

        return NextResponse.json({ message: 'Seed successful with Achievements and Certifications' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
