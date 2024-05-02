import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { db } from '@server/db';
import bcrypt from 'bcrypt';

// NextAuth options
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          throw new Error('Email or password is missing');

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            console.log('Invalid credentials');
            throw new Error('Invalid credentials');
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (!isCorrectPassword) {
            console.log('Invalid credentials');
            throw new Error('Invalid credentials');
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: createAccessToken(user.email),
            refreshToken: createRefreshToken(user.email),
            expiresIn: createTokenExpiry(),
          };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      user.accessToken = createAccessToken(email as string);
      user.refreshToken = createRefreshToken(email as string);
      user.expiresIn = createTokenExpiry();
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
      }
      if (Date.now() < token.expiresIn) return token;
      return await refreshToken(token);
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const createAccessToken = (email: string): string =>
  sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '20s' });

const createRefreshToken = (email: string): string =>
  sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

const createTokenExpiry = (): number => new Date().setTime(Date.now() + 20000);

async function refreshToken(token: JWT) {
  const decoded = verify(
    token.refreshToken,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  try {
    const user = await db.user.findUnique({ where: { email: decoded.email } });
    if (!user) {
      console.log('Invalid credentials');
      throw new Error('Invalid credentials');
    }

    return {
      ...token,
      accessToken: createAccessToken(user.email),
      refreshToken: createRefreshToken(user.email),
      expiresIn: createTokenExpiry(),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
