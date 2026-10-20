

import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as typeof globalThis & { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const resolvedParams = await params;
    const { projectId } = resolvedParams;
    const bugs = await prisma.bugReport.findMany({
      where: { projectId },
      include: { tester: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bugs);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch bugs' }, { status: 500 });
  }
}
