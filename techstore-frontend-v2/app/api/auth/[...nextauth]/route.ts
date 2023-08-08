import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios";
import NextAuth, {AuthOptions} from "next-auth";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {label: "email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(
                        "http://localhost:4001/api/v1/auth/sign-in",
                        credentials
                    );

                    return response.data;
                } catch (error) {
                    throw new Error("Invalid Credentials");
                }
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, token}) {
            session.user = token as any;
            return session;
        }
    },
    pages: {
        signIn: '/',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};