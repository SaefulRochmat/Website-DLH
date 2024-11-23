// app/api/laporan-masuk/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const laporan = await prisma.laporanMasuk.findMany({
    include: { laporanMasyarakat: true, user: true },
  });
  return new Response(JSON.stringify(laporan), { status: 200 });
}

export async function POST(request) {
  const { laporanMasyarakatId, userId, tindakan } = await request.json(); // Pastikan tindakan ada di sini
  
  // Cek jika tindakan terdefinisi
  if (!tindakan) {
    return new Response(JSON.stringify({ error: 'Tindakan is required' }), { status: 400 });
  }

  const laporan = await prisma.laporanMasuk.create({
    data: {
      laporanMasyarakatId,
      userId,
      tindakan, // Pastikan tindakan digunakan di sini
    },
  });
  
  return new Response(JSON.stringify(laporan), { status: 201 });
}
