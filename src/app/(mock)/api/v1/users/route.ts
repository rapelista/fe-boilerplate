import { NextRequest, NextResponse } from 'next/server';
import { paginationSchema } from '../validation';
import { users } from './dummy';

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const { data: validated, error } = paginationSchema.safeParse(params);

  if (error) return NextResponse.json({ error: error.errors });
  const { page, limit } = validated;

  const data = users.slice((page - 1) * limit, page * limit);
  const totalPage = Math.ceil(users.length / limit);
  const totalData = users.length;

  const meta = { page, totalPage, totalData };

  return NextResponse.json({ data, meta });
}
