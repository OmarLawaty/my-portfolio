import { NextRequest, NextResponse } from 'next/server';

import { github, LatestRepositories } from '@/apis';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const response = await github<LatestRepositories>(query);

  return NextResponse.json(response);
}
