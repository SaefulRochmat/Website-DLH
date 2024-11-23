import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedLaporan = await prisma.laporanMasyarakat.update({
      where: { id: parseInt(id) },
      data: {
        status: data.status
      }
    });

    return new Response(JSON.stringify(updatedLaporan), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update laporan' }), { status: 500 });
  }
}