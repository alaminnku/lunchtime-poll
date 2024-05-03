import { User } from '@prisma/client';

export function passwordResetTemplate(user: User, link: string) {
  return {
    to: user.email,
    from: process.env.SENDER_EMAIL as string,
    subject: `Lunchtime Poll Password Reset`,
    html: `
          <p>Hi ${user.name}, please reset your password here: ${link}. Please ignore if you haven't requested this change.</p>
          `,
  };
}
