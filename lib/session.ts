import { NextAuthOptions, User } from "next-auth";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AdapterUser } from "next-auth/adapters";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "",
      clientSecret: "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  // jwt: {
  //   encode: ({ secret, token }) => {},
  //   decode: async ({ secret, token }) => {},
  // },
  theme: {
    colorScheme: "dark",
    logo: "/logo.png",
  },

  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //if user exists, get user

        //if not create user

        return true;
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    },
    async session({ session }) {
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
  },
};
