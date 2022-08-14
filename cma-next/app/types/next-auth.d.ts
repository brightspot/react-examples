import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    brightspotUser: {
      name: string | undefined | null;
      username: string | undefined | null;
      avatar: {
        publicUrl: string | undefined | null;
      };
    };
  }
}
