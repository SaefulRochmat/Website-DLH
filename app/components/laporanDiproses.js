'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LaporanMasuk() {
  const [laporanMasuk, setLaporanMasuk] = useState([]);

  const fetchLaporanMasuk = async () => {
    const res = await fetch('/api/laporan-masuk', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Token untuk otorisasi
      },
    });
    const data = await res.json();
    setLaporanMasuk(data);
  };

  useEffect(() => {
    fetchLaporanMasuk();
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
        <h1 className="text-xl font-bold">Laporan Masuk</h1>
        <nav className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Dashboard
            </Button>
          </Link>
          <Link href="/statistik-laporan">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Statistik Laporan
            </Button>
          </Link>
          <Button variant="ghost" className="hover:bg-white/10">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
            </svg>
          </Button>
        </nav>
      </div>

      {/* Table */}
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Daftar Laporan Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Laporan</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laporanMasuk.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.laporanMasyarakat.judulLaporan}</TableCell>
                  <TableCell>{item.laporanMasyarakat.deskripsi}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
