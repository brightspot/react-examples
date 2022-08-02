import { JWT, DefaultJWT } from "next-auth/jwt";


declare module "next-auth/jwt" {
    interface JWT {
        token: {
            user: {
                userName?: string
            }
        }
    }
}