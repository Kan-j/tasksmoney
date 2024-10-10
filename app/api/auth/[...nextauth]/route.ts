import { ObjectId } from "mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
  
const handler= NextAuth({
      providers: [
          CredentialsProvider({
              // The name to display on the sign in form (e.g. 'Sign in with...')
              name: 'Credentials',
              // The credentials is used to generate a suitable form on the sign in page.
              // You can specify whatever fields you are expecting to be submitted.
              // e.g. domain, username, password, 2FA token, etc.
              // You can pass any HTML attribute to the <input> tag through the object.
              credentials: {
                email: { label: "Email", type: "text", placeholder: "firstName@lastName.vra.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(`https://tasksmoney-git-main-kanjs-projects.vercel.app/api/login`, {
                  method: 'POST',
                  body: JSON.stringify({
                      email: credentials?.email,
                      password: credentials?.password
                  }),
                  headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
          
                // If no error and we have user data, return it
                if (res.ok && user) {
                  return {...user}
                }
                // Return null if user data could not be retrieved
                return null
              }
      })
      ],
      pages: {
        signIn: '/login',
        newUser: '/register'
      },
      session:{
        strategy: 'jwt'
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
            session.user.isAdmin = token.isAdmin as boolean;
            session.user.id = token.id as ObjectId;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            return session;
          }
      }
  });
  
  export {handler as GET, handler as POST};
