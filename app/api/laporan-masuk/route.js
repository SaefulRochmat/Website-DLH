// app/api/laporan-masuk/route.js
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const laporan = await prisma.laporanMasuk.findMany({
      include: { 
        laporanMasyarakat: true, 
        user: true 
      },
    });
    return new Response(JSON.stringify(laporan), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in GET /api/laporan-masuk:', error);
    return new Response(JSON.stringify({ 
      message: 'Internal server error', 
      error: error.message 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request) {
  try {
    const { laporanMasyarakatId, userId, tindakan } = await request.json();
    
    if (!laporanMasyarakatId || !userId || !tindakan) {
      return new Response(JSON.stringify({ 
        message: 'Data tidak lengkap',
        required: { laporanMasyarakatId, userId, tindakan }
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const laporan = await prisma.laporanMasuk.create({
      data: {
        laporanMasyarakatId,
        userId,
        tindakan,
      },
    });
    
    return new Response(JSON.stringify(laporan), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in POST /api/laporan-masuk:', error);
    return new Response(JSON.stringify({ 
      message: 'Internal server error', 
      error: error.message 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}