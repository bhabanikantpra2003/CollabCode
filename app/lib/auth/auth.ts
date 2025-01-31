import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/prisma/prisma";
import {Session} from "../types/types"


export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {  
        async signIn({ user }) {
            if(user){
                const Existinguser = await prisma.user.findFirst({
                    where:{
                        email: user.email as string
                    }
                });
                if(Existinguser){
                    user.id = Existinguser.id; // Add id to user object
                    return true;
                }
                else{
                    const newUser = await prisma.user.create({
                        data:{
                            email: user.email as string,
                            name: user.name as string,
                            image: user.image as string,
                        }
                    });
                    user.id = newUser.id; // Add id to user object
                    return true;
                }
            }
            else{
                return false;
            }
        },
        async jwt({ token, account, profile, user }) {
            if(user && user?.id){
                token.id = user.id;
            }

            return token;
        }, 
        async session({ session, token, user }) {
            let newSession = session as Session;

            if (session.user) {
                newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id as string,
                    },
                };
            }
            else console.log('session.user is null');

            return  newSession;
        }
    }
}