import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const res = await fetch(`${process.env.SCALA_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const data = await res.json(); // token + email

        return {
          email: data.email,
          token: data.token,   // ✔ JWT from Scala backend
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.token = user.token; // ✔ store Scala JWT in session
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.token = token.token; // ✔ expose Scala JWT to client
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
