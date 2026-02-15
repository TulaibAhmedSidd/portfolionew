# High-End AI Personal Portfolio

This is a premium, AI-powered personal portfolio website built with Next.js 14, Three.js, and MongoDB.

## 🚀 Features

- **3D Interactive Background**: Built with React Three Fiber and Three.js, featuring parallax effects and dynamic lighting.
- **AI Typing Animation**: Hero section with a dynamic, intelligent typing effect.
- **Glassmorphism UI**: Modern, sleek design with blur effects and luxury gradients.
- **Micro-animations**: Powered by Framer Motion for smooth transitions and entrance animations.
- **Centralized Data**: MongoDB integration with Mongoose for dynamic content updates.
- **Responsive Design**: Optimized for all devices, from mobile to ultra-wide displays.
- **Performance Optimized**: Dynamic imports and server-side rendering for lightning-fast loads.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js & React Three Fiber
- **Database**: MongoDB & Mongoose

## 📁 Folder Structure

```text
/app         - Next.js App Router (Pages & API)
/components  - Reusable UI components (Hero, Navbar, etc.)
/lib         - Shared libraries (MongoDB connection)
/models      - Mongoose data models
/hooks       - Custom React hooks
/three       - 3D Scene components
/utils       - Utility functions
/public      - Static assets (Images, Fonts)
```

## ⚙️ Setup & Local Development

### 1. Prerequisites
- Node.js 18+
- MongoDB Database (Atlas or Local)

### 2. Environment Variables
Create a `.env` file in the root directory and add your MongoDB URI:
```env
NEXT_PUBLIC_MONGO_URI=your_mongodb_connection_string
```

### 3. Installation
```bash
npm install --legacy-peer-deps
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it.

### 5. Seeding Data
To populate the database with initial data from your resume:
Navigate to `http://localhost:3000/api/seed` in your browser.

## 📝 Content Updates

All content is managed via MongoDB. You can update:
- Personal Info
- About Section
- Skills
- Experience
- Projects
- Social Links

Use the API routes or a database GUI (like MongoDB Compass) to manage your data.

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add your `NEXT_PUBLIC_MONGO_URI` to Vercel's Environment Variables.
4. Deploy!

---
Built by Antigravity AI for Tulaib Ahmed Siddiqui.
