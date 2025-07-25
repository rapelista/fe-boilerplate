import { NextRequest, NextResponse } from 'next/server';

import { delay } from '~/utils/core/misc';

import { paginationSchema } from '../schema';

import { products } from './data';

const searchParams = paginationSchema.extend({});

export async function GET(request: NextRequest) {
  await delay();

  const { page, limit, search } = searchParams.parse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const filteredData = products.filter((products) => {
    if (!search) return true;

    return products.name.toLowerCase().includes(search.toLowerCase());
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedData,
    meta: {
      page,
      totalData: filteredData.length,
      totalPage: Math.ceil(filteredData.length / limit),
    },
  });
}
