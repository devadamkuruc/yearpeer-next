import {UserRole} from "@prisma/client";
import {type DefaultSession} from "next-auth";

export type ExtentedUser = DefaultSession["user"] & {
    role: UserRole;
}

declare module "next-auth" {
    interface Session {
        user: ExtentedUser
    }
}