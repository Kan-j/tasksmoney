import { ObjectId } from "mongoose";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    _id: ObjectId;
    username: string;
    email: string;
    isAdmin: boolean;  // Add custom field
  }

  interface Session {
    user: {
      /** The user's postal address. */
      isAdmin: boolean,
      id: ObjectId;
      username: string;
      email: string;
    } & DefaultSession["user"]
  }
}