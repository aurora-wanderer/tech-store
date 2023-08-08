declare module NextAuth {
    interface Session {
        user: {
            email: string;
            name: string | undefined;
            accessToken: string;
        }
    }
}