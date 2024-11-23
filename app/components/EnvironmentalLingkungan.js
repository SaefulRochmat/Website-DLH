'use client';
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filter, List, LayoutGrid, Table as TableIcon, LineChart as ChartIcon } from 'lucide-react';

import NavBarWithOutEffect from '../components/NavBarWithOutEffect';
import Footer from '../components/footer';

const categories = [
  "PERSENTASE PENANGANAN SAMPAH",
  "PERSENTASE PENCEMARAN STATUS MUTU AIR",
  "CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR",
  "CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL",
  "TEMPAT PEMBUANGAN SAMPAH (TPS) PER SATUAN PENDUDUK"
];

const years = [2017, 2018, 2019, 2020, 2021];

const EnvironmentalDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedYear, setSelectedYear] = useState("all");

  // Data lengkap dari 2017-2021
  const data = [
    // 2017
    {"id":1,"capaian_pembangunan":"PERSENTASE PENANGANAN SAMPAH","nilai_kondisi_lingkungan":0,"tahun":2017},
    {"id":2,"capaian_pembangunan":"PERSENTASE PENCEMARAN STATUS MUTU AIR","nilai_kondisi_lingkungan":431,"tahun":2017},
    {"id":3,"capaian_pembangunan":"CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR","nilai_kondisi_lingkungan":352,"tahun":2017},
    {"id":4,"capaian_pembangunan":"CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL","nilai_kondisi_lingkungan":0,"tahun":2017},
    {"id":5,"capaian_pembangunan":"TEMPAT PEMBUANGAN SAMPAH (TPS) PER SATUAN PENDUDUK","nilai_kondisi_lingkungan":6039,"tahun":2017},
    // 2018
    {"id":6,"capaian_pembangunan":"PERSENTASE PENANGANAN SAMPAH","nilai_kondisi_lingkungan":3289,"tahun":2018},
    {"id":7,"capaian_pembangunan":"PERSENTASE PENCEMARAN STATUS MUTU AIR","nilai_kondisi_lingkungan":291,"tahun":2018},
    {"id":8,"capaian_pembangunan":"CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR","nilai_kondisi_lingkungan":352,"tahun":2018},
    {"id":9,"capaian_pembangunan":"CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL","nilai_kondisi_lingkungan":3467,"tahun":2018},
    {"id":10,"capaian_pembangunan":"TEMPAT PEMBUANGAN SAMPAH (TPS) PER SATUAN PENDUDUK","nilai_kondisi_lingkungan":8049,"tahun":2018},
    // 2019
    {"id":11,"capaian_pembangunan":"PERSENTASE PENANGANAN SAMPAH","nilai_kondisi_lingkungan":3326,"tahun":2019},
    {"id":12,"capaian_pembangunan":"PERSENTASE PENCEMARAN STATUS MUTU AIR","nilai_kondisi_lingkungan":347,"tahun":2019},
    {"id":13,"capaian_pembangunan":"CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR","nilai_kondisi_lingkungan":352,"tahun":2019},
    {"id":14,"capaian_pembangunan":"CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL","nilai_kondisi_lingkungan":2421,"tahun":2019},
    {"id":15,"capaian_pembangunan":"TEMPAT PEMBUANGAN SAMPAH (TPS) PER SATUAN PENDUDUK","nilai_kondisi_lingkungan":8049,"tahun":2019},
    // 2020
    {"id":16,"capaian_pembangunan":"PERSENTASE PENANGANAN SAMPAH","nilai_kondisi_lingkungan":3515,"tahun":2020},
    {"id":17,"capaian_pembangunan":"PERSENTASE PENCEMARAN STATUS MUTU AIR","nilai_kondisi_lingkungan":347,"tahun":2020},
    {"id":18,"capaian_pembangunan":"CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR","nilai_kondisi_lingkungan":352,"tahun":2020},
    {"id":19,"capaian_pembangunan":"CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL","nilai_kondisi_lingkungan":2750,"tahun":2020},
    {"id":20,"capaian_pembangunan":"TEMPAT PEMBUANGAN SAMPAH (TPS) PER SATUAN PENDUDUK","nilai_kondisi_lingkungan":8221,"tahun":2020},
    // 2021
    {"id":21,"capaian_pembangunan":"PERSENTASE PENANGANAN SAMPAH","nilai_kondisi_lingkungan":3430,"tahun":2021},
    {"id":22,"capaian_pembangunan":"PERSENTASE PENCEMARAN STATUS MUTU AIR","nilai_kondisi_lingkungan":62,"tahun":2021},
    {"id":23,"capaian_pembangunan":"CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR","nilai_kondisi_lingkungan":352,"tahun":2021},
    {"id":24,"capaian_pembangunan":"CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL","nilai_kondisi_lingkungan":8947,"tahun":2021},
    {"id":25,"capaian_pembangunan":"TEMPAT PEMBUANGAN SAMPAH (TPS) PER SATUAN PENDUDUK","nilai_kondisi_lingkungan":0,"tahun":2021}
  ];

  const filteredData = useMemo(() => {
    let filtered = data;
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.capaian_pembangunan === selectedCategory);
    }
    if (selectedYear !== "all") {
      filtered = filtered.filter(item => item.tahun === parseInt(selectedYear));
    }
    return filtered;
  }, [selectedCategory, selectedYear]);

  return (
    <>
      <header>
        <NavBarWithOutEffect />
      </header>
      <main>
        <div className="container border-t-4 border-green-700 rounded-md shadow-md mx-auto mt-28 mb-12 p-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-light text-green-600">Kondisi Lingkungan Hidup Di Kabupaten Majalengka</h1>
            <p className="text-gray-600">Data monitoring kondisi lingkungan hidup di Kabupaten Majalengka dari tahun 2017-2021</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="cards" className="w-full">
            <TabsList>
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                Cards
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <TableIcon className="h-4 w-4" />
                Table
              </TabsTrigger>
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <ChartIcon className="h-4 w-4" />
                Chart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.capaian_pembangunan}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold">{item.nilai_kondisi_lingkungan}%</span>
                        <span className="text-gray-500">Tahun {item.tahun}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredData.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex justify-between items-center p-6">
                      <div>
                        <h3 className="font-medium">{item.capaian_pembangunan}</h3>
                        <p className="text-sm text-gray-500">Tahun {item.tahun}</p>
                      </div>
                      <span className="text-2xl font-bold">{item.nilai_kondisi_lingkungan}%</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tahun</TableHead>
                    <TableHead>Capaian Pembangunan</TableHead>
                    <TableHead className="text-right">Nilai (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.tahun}</TableCell>
                      <TableCell>{item.capaian_pembangunan}</TableCell>
                      <TableCell className="text-right">{item.nilai_kondisi_lingkungan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="chart" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="nilai_kondisi_lingkungan" 
                        name="Nilai (%)" 
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default EnvironmentalDashboard;