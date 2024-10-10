import { authOptions } from "@/lib/config/authOptions";
import { ObjectId } from "mongoose";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"



const handler= NextAuth(authOptions);
  
export {handler as GET, handler as POST};
