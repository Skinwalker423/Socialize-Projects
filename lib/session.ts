import { NextAuthOptions, User } from "next-auth";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AdapterUser } from "next-auth/adapters";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import {
  SessionInterface,
  UserProfile,
} from "@/common.types";
import { getUserData } from "./actions";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      checks: "pkce",
    }),
    // ...add more providers here
  ],
  // jwt: {
  //   encode: ({ secret, token }) => {},
  //   decode: async ({ secret, token }) => {},
  // },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "dark",
    logo: "/logo.png",
  },

  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //if user exists, get user

        const data = (await getUserData(
          user?.email as string
        )) as { user?: UserProfile };

        //if not create user

        if (!data.user) {
          //action create user
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(
    authOptions
  )) as SessionInterface;

  return session;
}
