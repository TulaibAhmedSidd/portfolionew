import mongoose, { Schema, model, models } from 'mongoose';

const PersonalInfoSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    summary: { type: String },
    resumeUrl: { type: String },
    profileImage: { type: String },
}, { timestamps: true });

export const PersonalInfo = models.PersonalInfo || model('PersonalInfo', PersonalInfoSchema);

const AboutSchema = new Schema({
    content: { type: String, required: true },
    subContent: { type: String },
    stats: [{
        label: { type: String },
        value: { type: String }
    }]
}, { timestamps: true });

export const About = models.About || model('About', AboutSchema);

const SkillSchema = new Schema({
    name: { type: String, required: true },
    level: { type: Number },
    category: { type: String }, // e.g., Frontend, Backend, Tools
    icon: { type: String },
}, { timestamps: true });

export const Skill = models.Skill || model('Skill', SkillSchema);

const ExperienceSchema = new Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: [String],
}, { timestamps: true });

export const Experience = models.Experience || model('Experience', ExperienceSchema);

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [String],
    link: { type: String },
    github: { type: String },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

export const Project = models.Project || model('Project', ProjectSchema);

const SocialLinkSchema = new Schema({
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String },
}, { timestamps: true });

export const SocialLink = models.SocialLink || model('SocialLink', SocialLinkSchema);

const TestimonialSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    content: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);

const ContactMessageSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

export const ContactMessage = models.ContactMessage || model('ContactMessage', ContactMessageSchema);

const AchievementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String },
}, { timestamps: true });

export const Achievement = models.Achievement || model('Achievement', AchievementSchema);

const CertificationSchema = new Schema({
    title: { type: String, required: true },
    issuer: { type: String },
    date: { type: String },
    link: { type: String },
}, { timestamps: true });

export const Certification = models.Certification || model('Certification', CertificationSchema);
