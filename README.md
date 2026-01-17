# MIBCS Tech Club Website

A modern, professional website for Machine Learning, IoT, Blockchain & Cyber Security tech club with public site and secure admin panel.

## Features

### Public Website
- **Home**: Hero section, CTAs, domains overview, achievements, upcoming events
- **About**: Vision, mission, history, mentor details
- **Domains/Teams**: ML, IoT, Blockchain, Cybersecurity teams
- **Projects**: Showcase with tech stack, status, links
- **Achievements**: Hackathons, competitions, research with filters
- **Events**: Upcoming events with registration, past events gallery
- **Members**: Core, technical, design teams with photos
- **Sponsors**: Sponsorship info and past sponsors
- **Contact**: Join info, contact form, social links

### Admin Panel
- Secure JWT authentication
- CRUD operations for events, achievements, projects
- Manage sponsor & contact inquiries
- Image upload via Cloudinary
- Analytics dashboard

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Analytics**: Google Analytics
- **Hosting**: Vercel (frontend), Render (backend)

## Quick Start

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Set up environment variables (see .env.example files)

3. Start development servers:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/          # React frontend
├── server/          # Node.js backend
├── shared/          # Shared utilities
└── docs/           # Documentation
```