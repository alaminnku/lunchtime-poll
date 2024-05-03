import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
});

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getISOStringWithoutTime = () =>
  `${new Date().toISOString().split('T')[0]}T00:00:00.000Z`;
