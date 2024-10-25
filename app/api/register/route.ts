import { connectToDatabase } from '@/lib/mongodb'; // Your function to connect to the DB
import bcrypt from 'bcrypt'; // For password hashing
import User from "@/lib/models/User.model"; // Import User model
import {generate} from 'referral-codes'; // Import referral-codes package

// Define the RequestBody interface
interface RequestBody {
  email: string;
  username: string;
  password: string;
  referralCode?: string; // Optional field for referral code
}

export async function POST(request: Request) {
  // Connect to the MongoDB database first
  await connectToDatabase();

  // Parse the request body
  const body: RequestBody = await request.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Initialize the `referredBy` field (null by default)
  let referredBy = null;

  // Check if a referral code was provided
  if (body.referralCode) {
    // Find the user who owns the referral code
    const referrer = await User.findOne({ referralCode: body.referralCode });

    if (referrer) {
      referredBy = referrer._id; // Set the `referredBy` field to the referrer's ID
    } else {
      return new Response(JSON.stringify({ message: 'Invalid referral code' }), { status: 400 });
    }
  }

  // Generate a unique referral code for the new user
  let userReferralCode: string='';
  let isCodeUnique = false;

  // Keep generating a code until a unique one is found
  while (!isCodeUnique) {
    userReferralCode = generate({
      length: 8, // Customize length as needed
      count: 1,  // Only need one code
    })[0];

    // Check if the referral code already exists
    const existingCodeUser = await User.findOne({ referralCode: userReferralCode });
    if (!existingCodeUser) {
      isCodeUnique = true; // Referral code is unique, exit the loop
    }
  }

  // Create a new user
  // Create a new user
  const newUser = new User({
    email: body.email,
    username: body.username,
    password: hashedPassword,
    totalAssets: 0,
    totalCommissions: 0,
    isAdmin: false,
    referredBy: referredBy, // If referred by someone, store their user ID
    referralCode: userReferralCode, // Store unique referral code
  });

  // Save the user to the database
  await newUser.save();

  // Return the created user (without the password)
  const { password, ...userWithoutPass } = newUser.toObject();
  return new Response(JSON.stringify(userWithoutPass), { status: 201 });
}
