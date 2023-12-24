import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const expiresDate = new Date();
expiresDate.setMonth(expiresDate.getMonth() + 1);

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const user = await prisma.employee.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password || "",
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        const response = await prisma.employee
          .findUnique({
            where: {
              email: session.user.email || "",
            },
            select: {
              id: true,
              image: true,
            },
          })
          .then((res) => res);

        session.user.id = response?.id || "";
        session.user.image = response?.image;
      }

      console.log(session);

      return {
        expires: session.expires,
        user: {
          id: session.user?.id,
          email: session.user?.email,
          image: session.user?.image,
          name: session.user?.name,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
