

import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as typeof globalThis & { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const applications = await prisma.application.findMany({
      where: { project: { devId: (session.user as any).id } },
      include: {
        tester: { select: { name: true } },
        project: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = applications.map(app => ({
      id: app.id,
      testerName: app.tester.name || 'Unknown Tester',
      projectId: app.projectId,
      projectTitle: app.project.title,
      status: app.status,
      appliedAt: 'Recently',
    }));

    return NextResponse.json(formatted);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { projectId, message } = await req.json();
    
    const existing = await prisma.application.findFirst({
      where: { projectId, testerId: (session.user as any).id }
    });
    if (existing) return NextResponse.json({ error: 'Already applied' }, { status: 400 });

    const application = await prisma.application.create({
      data: {
        projectId,
        testerId: (session.user as any).id,
        status: 'PENDING',
      },
    });
    return NextResponse.json(application);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to apply' }, { status: 500 });
  }
}
