import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const laporan = await prisma.laporanMasyarakat.findMany();
  return new Response(JSON.stringify(laporan), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  const laporan = await prisma.laporanMasyarakat.create({ data });
  return new Response(JSON.stringify(laporan), { status: 201 });
}
