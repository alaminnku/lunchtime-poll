import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

export type Alert = {
  message: string;
  type: 'failed' | 'success';
};

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      accessToken: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    role: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

export type CustomError = {
  message: string;
};
