import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT as NextAuthJWT } from "next-auth/jwt";
import { Session as NextAuthSession, User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
    accessToken: string;
    refreshToken: string;
    userName: string;
}

interface Session extends NextAuthSession {
    accessToken: string;
    refreshToken: string;
    user: {
        name: string;
    }

}

interface JWT extends NextAuthJWT {
    accessToken: string;
    refreshToken: string;
    user: {
        userName: string;
    };
}

const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: "Username or email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`http://localhost:5125/api/Auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                })

                const user: User = await res.json()

                if (user) {
                    return user
                }
                return null
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            console.log(user, "user")
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.user = { userName: user.userName } // Add userName directly to the token
            }
            return token
        },
        async session({ session, token, user }: { session: Session, token: JWT, user: User }) {
            console.log(user, "user from session")
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.user.name = token.user?.userName ?? 'Unknown' // Retrieve userName from the token
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
}

export default NextAuth(options)
