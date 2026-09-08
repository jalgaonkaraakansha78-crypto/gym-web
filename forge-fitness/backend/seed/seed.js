// Populates the database with sample content so the frontend has
// realistic data immediately after connecting.
//
// Run with:  npm run seed   (from the backend/ folder)
//
// This wipes and re-creates: memberships, trainers, programs, testimonials,
// and a single admin user (if one doesn't already exist).

require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = require('../config/db');
const User = require('../models/User');
const Membership = require('../models/Membership');
const Trainer = require('../models/Trainer');
const Program = require('../models/Program');
const Testimonial = require('../models/Testimonial');

const memberships = [
  {
    name: 'Basic',
    description: 'Everything you need to get started.',
    price: 1499,
    duration: 'per month',
    features: ['Full Gym Access', 'Cardio Zone', 'Locker Facility'],
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Our most popular plan for serious progress.',
    price: 2499,
    duration: 'per month',
    features: ['Everything in Basic', 'Personalized Workout Plan', 'Diet Guidance'],
    popular: true,
  },
  {
    name: 'Elite',
    description: 'Full coaching support for maximum results.',
    price: 3999,
    duration: 'per month',
    features: ['Everything in Pro', 'Dedicated Personal Trainer', 'Monthly Progress Tracking'],
    popular: false,
  },
];

const trainers = [
  {
    name: 'Rahul Sharma',
    specialization: 'Strength & Conditioning Coach',
    experience: '8 Years Experience',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=80',
    bio: 'Helps members build raw strength safely with structured barbell programming.',
  },
  {
    name: 'Priya Nair',
    specialization: 'Nutrition & Fat Loss Coach',
    experience: '6 Years Experience',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80',
    bio: 'Combines training plans with practical nutrition guidance for lasting results.',
  },
  {
    name: 'Vikram Singh',
    specialization: 'Powerlifting Coach',
    experience: '10 Years Experience',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=700&q=80',
    bio: 'Former competitive powerlifter now coaching the big three lifts.',
  },
  {
    name: 'Anjali Mehta',
    specialization: 'Functional Training Coach',
    experience: '5 Years Experience',
    image: 'https://images.unsplash.com/photo-1571907480495-4e8a3c0e2c1c?auto=format&fit=crop&w=700&q=80',
    bio: 'Focuses on movement quality and strength that carries over to daily life.',
  },
];

const programs = [
  {
    name: 'Weight Training',
    description: 'Build raw strength with structured free-weight and barbell programming.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
    category: 'Strength',
  },
  {
    name: 'Muscle Building',
    description: 'Hypertrophy-focused splits designed to add size where it counts.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    category: 'Strength',
  },
  {
    name: 'Fat Loss',
    description: 'High-output circuits paired with nutrition guidance that gets results.',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80',
    category: 'Conditioning',
  },
  {
    name: 'Personal Training',
    description: 'One-on-one coaching with a trainer fully focused on your goals.',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=900&q=80',
    category: 'Coaching',
  },
  {
    name: 'Functional Training',
    description: 'Build strength that carries over to real life and everyday movement.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    category: 'Conditioning',
  },
  {
    name: 'Cardio',
    description: 'Improve endurance and heart health with guided cardio sessions.',
    image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&w=900&q=80',
    category: 'Conditioning',
  },
];

const testimonials = [
  {
    name: 'Karan Patil',
    message: 'The trainers are supportive and the environment is amazing. I\u2019ve completely changed my lifestyle.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Neha Joshi',
    message: 'Best gym I\u2019ve trained at. Clean equipment, zero waiting time, and coaches who actually care.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Suresh Rao',
    message: 'Joined for weight loss, stayed for the community. Down 11kg and stronger than ever.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
];

async function seed() {
  await connectDB();

  console.log('Clearing existing content...');
  await Promise.all([
    Membership.deleteMany({}),
    Trainer.deleteMany({}),
    Program.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  console.log('Inserting sample content...');
  await Membership.insertMany(memberships);
  await Trainer.insertMany(trainers);
  await Program.insertMany(programs);
  await Testimonial.insertMany(testimonials);

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@forgefitness.in';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Gym Admin',
      email: adminEmail,
      password: adminPassword, // hashed automatically by the User model's pre-save hook
      role: 'admin',
    });
    console.log(`Admin user created — email: ${adminEmail} / password: ${adminPassword}`);
    console.log('Change this password after your first login.');
  } else {
    console.log('Admin user already exists, skipping creation.');
  }

  console.log('Seed complete.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
