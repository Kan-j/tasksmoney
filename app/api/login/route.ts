import { connectToDatabase } from '@/lib/mongodb';   // Your function to connect to the DB
import bcrypt from 'bcrypt'                  // For password hashing
import User from "@/lib/models/User.model";     

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  await connectToDatabase(); // Connect to MongoDB

  const body: RequestBody = await request.json();

  try {
    // Find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return the user data without the password
    const { password, ...userWithoutPassword } = user.toObject();

    return new Response(JSON.stringify(userWithoutPassword));
  } catch (error:any) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
