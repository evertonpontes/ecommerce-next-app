import NextAuth from "next-auth";
import { Provider } from "next-auth/providers/index";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: ISODateString;
  }
}
