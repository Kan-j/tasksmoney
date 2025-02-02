import { ObjectId } from "mongoose";
import {  NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { allowUserToProceedFromStop } from '../actions/usertasks.action';

export const authOptions:NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "firstName@lastName.vra.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Missing credentials");
            }
  
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
  
            if (!res.ok) {
              const errorResponse = await res.json();
              throw new Error(errorResponse.message || "Login failed");
            }
  
            const user = await res.json();
            if (user) {
              return user;
            } else {
              return null;
            }
          } catch (error:any) {
            console.error("Authorize error:", error.message);
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
      newUser: "/register",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user._id;
          token.isAdmin = user.isAdmin;
          token.email = user.email;
          token.name = user.username;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id as ObjectId;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        return session;
      },
    },
    jwt:{
      secret: process.env.NEXTAUTH_SECRET,  // Ensure secret is used for decryption
      
    }
  };