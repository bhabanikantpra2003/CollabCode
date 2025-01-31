import { Session as NextAuthSession } from 'next-auth';
import { User as NextAuthUser } from 'next-auth';

export interface User extends NextAuthUser {
    id: string;
}

export interface Session extends NextAuthSession {
    user?: User;
}