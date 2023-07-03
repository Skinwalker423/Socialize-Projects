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
import { createUser, getUserData } from "./actions";

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
  //   encode: ({ secret, token }) => {
  //     console.log("token", token);
  //     console.log("secret", secret);
  //     const encodedToken = jsonwebtoken.sign(
  //       {
  //         ...token,
  //         iss: "grafbase",
  //       },
  //       secret,
  //       {
  //         expiresIn: "1h",
  //       }
  //     );
  //     console.log("encoded token", encodedToken);
  //     return encodedToken;
  //   },
  //   decode: ({ secret, token }) => {
  //     console.log("dtoken", token);
  //     console.log("dsecret", secret);

  //     const decodedToken = jsonwebtoken.verify(
  //       token!,
  //       secret
  //     ) as JWT;
  //     console.log("decoded token", decodedToken);
  //     return decodedToken;
  //   },
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
          const userProfile = await createUser(
            user?.name as string,
            user?.email as string,
            user?.image as string
          );
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      // Send properties to the client, like an access_token from a provider.
      const email = session?.user?.email;

      try {
        const data = (await getUserData(
          email as string
        )) as { user?: UserProfile };
        console.log("data within session", data);
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log("problem accessing user", error);
        return session;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(
    authOptions
  )) as SessionInterface;
  console.log("session details", session);

  return session;
}
