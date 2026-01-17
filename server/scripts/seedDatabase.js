const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Event = require('../models/Event');
const Achievement = require('../models/Achievement');
const Project = require('../models/Project');
const Member = require('../models/Member');
const Sponsor = require('../models/Sponsor');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mibcs');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Event.deleteMany({}),
      Achievement.deleteMany({}),
      Project.deleteMany({}),
      Member.deleteMany({}),
      Sponsor.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@mibcs.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create sample events
    const events = [
      {
        title: 'Introduction to Machine Learning',
        description: 'A comprehensive workshop covering the fundamentals of machine learning, including supervised and unsupervised learning algorithms.',
        shortDescription: 'Learn ML fundamentals in this hands-on workshop',
        date: new Date('2024-02-15'),
        time: '2:00 PM - 5:00 PM',
        venue: 'Computer Lab 1, Tech Building',
        type: 'workshop',
        status: 'upcoming',
        registrationLink: 'https://forms.google.com/ml-workshop',
        maxParticipants: 50,
        domains: ['ML'],
        organizers: ['John Doe', 'Jane Smith'],
        featured: true,
        analytics: { views: 125, registrationClicks: 45 }
      },
      {
        title: 'Blockchain Hackathon 2024',
        description: 'A 48-hour hackathon focused on building innovative blockchain solutions for real-world problems.',
        shortDescription: '48-hour blockchain innovation challenge',
        date: new Date('2024-03-01'),
        endDate: new Date('2024-03-03'),
        time: '9:00 AM',
        venue: 'Innovation Hub',
        type: 'hackathon',
        status: 'upcoming',
        registrationLink: 'https://forms.google.com/blockchain-hackathon',
        maxParticipants: 100,
        domains: ['Blockchain'],
        organizers: ['Alice Johnson', 'Bob Wilson'],
        featured: true,
        analytics: { views: 200, registrationClicks: 75 }
      },
      {
        title: 'IoT Security Workshop',
        description: 'Learn about security challenges in IoT devices and how to implement secure IoT solutions.',
        shortDescription: 'Secure your IoT projects with best practices',
        date: new Date('2024-01-20'),
        time: '1:00 PM - 4:00 PM',
        venue: 'Electronics Lab',
        type: 'workshop',
        status: 'completed',
        domains: ['IoT', 'Cybersecurity'],
        organizers: ['Charlie Brown'],
        analytics: { views: 89, registrationClicks: 32 }
      }
    ];

    await Event.insertMany(events);
    console.log('Created sample events');

    // Create sample achievements
    const achievements = [
      {
        title: 'First Place - National AI Competition',
        description: 'Our team won first place in the National AI Competition with an innovative computer vision solution for medical diagnosis.',
        category: 'competition',
        year: 2024,
        date: new Date('2024-01-15'),
        position: '1st',
        event: {
          name: 'National AI Competition 2024',
          organizer: 'Tech University Consortium',
          location: 'New Delhi, India'
        },
        teamMembers: ['Sarah Connor', 'John Matrix', 'Kyle Reese'],
        domains: ['ML'],
        featured: true
      },
      {
        title: 'Best Blockchain Project - University Hackathon',
        description: 'Developed a decentralized voting system that ensures transparency and security in elections.',
        category: 'hackathon',
        year: 2023,
        date: new Date('2023-11-20'),
        position: 'Winner',
        event: {
          name: 'University Innovation Hackathon',
          organizer: 'University Tech Club',
          location: 'Campus'
        },
        teamMembers: ['Mike Johnson', 'Lisa Wang', 'David Kim'],
        domains: ['Blockchain'],
        featured: true
      },
      {
        title: 'Research Paper Published - IoT Security',
        description: 'Published a research paper on "Advanced Security Protocols for IoT Networks" in a peer-reviewed journal.',
        category: 'research',
        year: 2023,
        date: new Date('2023-09-10'),
        teamMembers: ['Dr. Emily Chen', 'Robert Taylor'],
        domains: ['IoT', 'Cybersecurity'],
        links: [
          { type: 'Paper', url: 'https://example.com/paper' }
        ]
      }
    ];

    await Achievement.insertMany(achievements);
    console.log('Created sample achievements');

    // Create sample projects
    const projects = [
      {
        title: 'Smart Campus Management System',
        description: 'An IoT-based system for managing campus resources including lighting, temperature, and security systems.',
        shortDescription: 'IoT solution for efficient campus resource management',
        techStack: ['React', 'Node.js', 'MongoDB', 'Arduino', 'Raspberry Pi'],
        domains: ['IoT'],
        status: 'ongoing',
        startDate: new Date('2023-09-01'),
        teamMembers: [
          { name: 'Alex Thompson', role: 'Project Lead', github: 'alexthompson' },
          { name: 'Maria Garcia', role: 'Hardware Engineer', github: 'mariagarcia' },
          { name: 'James Wilson', role: 'Software Developer', github: 'jameswilson' }
        ],
        links: {
          github: 'https://github.com/mibcs/smart-campus',
          demo: 'https://smart-campus-demo.com'
        },
        featured: true,
        difficulty: 'Advanced'
      },
      {
        title: 'Cryptocurrency Price Predictor',
        description: 'Machine learning model that predicts cryptocurrency prices using historical data and market sentiment analysis.',
        shortDescription: 'ML-powered crypto price prediction system',
        techStack: ['Python', 'TensorFlow', 'Pandas', 'Flask', 'React'],
        domains: ['ML', 'Blockchain'],
        status: 'completed',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-12-15'),
        teamMembers: [
          { name: 'Nina Patel', role: 'ML Engineer', github: 'ninapatel' },
          { name: 'Tom Anderson', role: 'Data Scientist', github: 'tomanderson' }
        ],
        links: {
          github: 'https://github.com/mibcs/crypto-predictor',
          demo: 'https://crypto-predictor-demo.com'
        },
        featured: true,
        difficulty: 'Intermediate'
      },
      {
        title: 'Secure File Sharing Platform',
        description: 'A blockchain-based file sharing platform that ensures data integrity and user privacy through encryption.',
        shortDescription: 'Blockchain-secured file sharing with encryption',
        techStack: ['Solidity', 'Web3.js', 'IPFS', 'React', 'Express'],
        domains: ['Blockchain', 'Cybersecurity'],
        status: 'planning',
        startDate: new Date('2024-02-01'),
        teamMembers: [
          { name: 'Chris Lee', role: 'Blockchain Developer', github: 'chrislee' },
          { name: 'Anna Rodriguez', role: 'Security Specialist', github: 'annarodriguez' }
        ],
        difficulty: 'Advanced'
      }
    ];

    await Project.insertMany(projects);
    console.log('Created sample projects');

    // Create sample members
    const members = [
      {
        name: 'John Doe',
        email: 'john.doe@university.edu',
        role: 'President',
        team: 'Core',
        domains: ['ML', 'Blockchain'],
        bio: 'Passionate about AI and blockchain technology. Leading MIBCS towards innovation and excellence.',
        social: {
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe'
        },
        skills: ['Python', 'TensorFlow', 'Solidity', 'Leadership'],
        graduationYear: 2024,
        position: 1
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        role: 'Vice President',
        team: 'Core',
        domains: ['IoT', 'Cybersecurity'],
        bio: 'Expert in IoT security and embedded systems. Organizing workshops and technical events.',
        social: {
          linkedin: 'https://linkedin.com/in/janesmith',
          github: 'https://github.com/janesmith'
        },
        skills: ['C++', 'Arduino', 'Cybersecurity', 'Project Management'],
        graduationYear: 2024,
        position: 2
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@university.edu',
        role: 'Technical Lead - ML',
        team: 'Technical',
        domains: ['ML'],
        bio: 'Machine learning enthusiast with experience in computer vision and NLP projects.',
        social: {
          linkedin: 'https://linkedin.com/in/alicejohnson',
          github: 'https://github.com/alicejohnson'
        },
        skills: ['Python', 'PyTorch', 'Computer Vision', 'NLP'],
        graduationYear: 2025,
        position: 1
      },
      {
        name: 'Bob Wilson',
        email: 'bob.wilson@university.edu',
        role: 'Technical Lead - Blockchain',
        team: 'Technical',
        domains: ['Blockchain'],
        bio: 'Blockchain developer working on DeFi and smart contract security.',
        social: {
          linkedin: 'https://linkedin.com/in/bobwilson',
          github: 'https://github.com/bobwilson'
        },
        skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'DeFi'],
        graduationYear: 2025,
        position: 2
      }
    ];

    await Member.insertMany(members);
    console.log('Created sample members');

    // Create sample sponsors
    const sponsors = [
      {
        name: 'TechCorp Solutions',
        description: 'Leading technology company specializing in AI and machine learning solutions.',
        tier: 'Gold',
        sponsorshipType: 'Financial',
        amount: 10000,
        startDate: new Date('2023-08-01'),
        endDate: new Date('2024-07-31'),
        events: ['ML Workshop Series', 'Annual Tech Conference'],
        contactPerson: {
          name: 'Sarah Johnson',
          email: 'sarah@techcorp.com',
          phone: '+1-555-0123'
        },
        isActive: true,
        featured: true
      },
      {
        name: 'Innovation Labs',
        description: 'Research and development company focused on emerging technologies.',
        tier: 'Silver',
        sponsorshipType: 'Mentorship',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-08-31'),
        events: ['Hackathon 2024'],
        contactPerson: {
          name: 'Mike Chen',
          email: 'mike@innovationlabs.com',
          phone: '+1-555-0456'
        },
        isActive: true
      }
    ];

    await Sponsor.insertMany(sponsors);
    console.log('Created sample sponsors');

    console.log('Database seeded successfully!');
    console.log('\nAdmin Login Credentials:');
    console.log('Email:', adminUser.email);
    console.log('Password:', process.env.ADMIN_PASSWORD || 'admin123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seed function
seedData();