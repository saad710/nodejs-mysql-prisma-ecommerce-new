import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import prisma from '../prismaClient';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
}, async (accessToken: string, _refreshToken: string, profile: Profile, done: Function) => {
  // Check if user already exists in our db
  const existingUser = await prisma.user.findUnique({
    where: { email: profile.emails![0].value }
  });

  if (existingUser) {
    // Already have user in db
    return done(null, existingUser);
  }

  // If not, create a new user in our db
  const newUser = await prisma.user.create({
    data: {
      full_name: profile.displayName,
      email: profile.emails![0].value,
      password: '',  // No password for social logins
      role_id: 2,    // Assuming '2' is the role ID for customers
      status: 'active'
    }
  });

  done(null, newUser);
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
}, async (accessToken: string, _refreshToken: string, profile: any, done: Function) => {
  // Check if user already exists in our db
  const existingUser = await prisma.user.findUnique({
    where: { email: profile.emails![0].value }
  });

  if (existingUser) {
    // Already have user in db
    return done(null, existingUser);
  }

  // If not, create a new user in our db
  const newUser = await prisma.user.create({
    data: {
      full_name: `${profile.name.givenName} ${profile.name.familyName}`,
      email: profile.emails![0].value,
      password: '',  // No password for social logins
      role_id: 2,    // Assuming '2' is the role ID for customers
      status: 'active'
    }
  });

  done(null, newUser);
}));

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: number, done) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  done(null, user);
});
