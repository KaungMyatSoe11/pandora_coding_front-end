import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
              key: process.env.NEXT_PUBLIC_AUTH_API_KEY,
            },
          },
        );
        const user = await res.json();
        // If no error and we have user data, return it
        console.log(user);
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ user, session, token }) {
      // var inFifteenMinutes = session.expires
      //   ? session.expires
      //   : new Date(new Date().getTime() + 30 * 1000);
      // console.log(inFifteenMinutes);
      if (session?.user) {
        session.user.id = token.id;
        session.user.token = token.token;
        session.maxAge = 24 * 60;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
