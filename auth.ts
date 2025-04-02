import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import {UserRole} from "@prisma/client";
import {prisma} from "@/prisma";
import {getUserById} from "@/lib/data";


export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await prisma.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    ...authConfig,
})