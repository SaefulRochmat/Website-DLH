// app/api/laporan-masyarakat/[id]/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const updatedLaporan = await prisma.laporanMasyarakat.update({
      where: { 
        id: parseInt(id) 
      },
      data: {
        status: data.status
      }
    });

    return new Response(JSON.stringify(updatedLaporan), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in PATCH /api/laporan-masyarakat/[id]:', error);
    return new Response(JSON.stringify({ 
      message: 'Failed to update laporan',
      error: error.message 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}