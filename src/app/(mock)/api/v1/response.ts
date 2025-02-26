import { NextResponse } from 'next/server';

export function Response(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    status: 200,
    ...init,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...init?.headers,
    },
  });
}
