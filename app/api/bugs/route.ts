

import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as typeof globalThis & { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const bug = await prisma.bugReport.create({
      data: {
        projectId: body.projectId,
        testerId: (session.user as any).id,
        title: body.title,
        description: body.description,
        severity: body.severity,
        status: 'OPEN',
      },
    });
    return NextResponse.json(bug);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to report bug' }, { status: 500 });
  }
}
