import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

if (!clientId || !clientSecret) {
    throw Error("Missing clientId or clientSecret");
}

export const authOptions: NextAuthOptions = {
    providers: [
      GithubProvider({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri,
      })
    ],
    callbacks: {
      async redirect({ baseUrl }) {
        // Si la connexion est réussie, redirige vers le dashboard
        return baseUrl + '/dashboard';
      }
    }
  };
  