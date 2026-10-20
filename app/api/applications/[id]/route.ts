

import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as typeof globalThis & { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { status } = await req.json();
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    if (status === 'ACCEPTED') {
      await prisma.project.update({
        where: { id: application.projectId },
        data: { status: 'TESTING' },
      });
    }

    return NextResponse.json(application);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
