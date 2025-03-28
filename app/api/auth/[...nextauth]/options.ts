import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
// eslint-disable-next-line
const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

if (!clientId || !clientSecret) {
    throw new Error("Missing clientId or clientSecret");
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/register",
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        GithubProvider({
            clientId: clientId,
            clientSecret: clientSecret,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing username or password");
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                });
                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                }
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            
            if (url === baseUrl || url.startsWith(baseUrl)) {
                return `${baseUrl}/history`;
            }
            return url;
        },
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            };
        },
    },    
};
