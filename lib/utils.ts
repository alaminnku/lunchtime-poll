import { Inter } from 'next/font/google';

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const inter = Inter({
  subsets: ['latin'],
});
