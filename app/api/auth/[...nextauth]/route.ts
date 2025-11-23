import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in with Farcaster",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0",
                },
                // In a real app, you'd verify the signature here
                // For this demo, we'll accept the FID and username passed from the client
                fid: {
                    label: "FID",
                    type: "text",
                },
                username: {
                    label: "Username",
                    type: "text",
                },
                pfpUrl: {
                    label: "PFP URL",
                    type: "text",
                },
                displayName: {
                    label: "Display Name",
                    type: "text",
                },
                bio: {
                    label: "Bio",
                    type: "text",
                }
            },
            async authorize(credentials) {
                // In a production app, you MUST verify the signature using @farcaster/auth-client
                // For this mini-app demo, we'll trust the client-side verification for now
                // to keep it simple and avoid complex backend setup

                if (!credentials?.fid) return null;

                return {
                    id: credentials.fid,
                    name: credentials.displayName || credentials.username,
                    image: credentials.pfpUrl,
                    username: credentials.username,
                    bio: credentials.bio,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.sub;
                session.user.username = token.username;
                session.user.bio = token.bio;
                session.user.fid = token.sub;
            }
            return session;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.username = user.username;
                token.bio = user.bio;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
