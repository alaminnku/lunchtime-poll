import { db } from '@server/db';

export async function POST(request: Request) {
  const { question, options } = await request.json();

  if (!question || options.length < 4) {
    return Response.json('Question or options are missing', { status: 400 });
  }

  try {
    const poll = await db.poll.create({
      data: {
        question,
        options,
      },
    });
    return Response.json(poll, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json('Something went wrong', { status: 500 });
  }
}
