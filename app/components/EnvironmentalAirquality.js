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

const AirQualityDashboard = () => {
  const data = [
    {
      "id": 1,
      "indikator_parameter": "SO2",
      "jumlah": 8.3,
      "satuan": "MIKROGRAM/NANOMETERKUBIK",
      "tahun": 2022
    },
    {
      "id": 2,
      "indikator_parameter": "NO2",
      "jumlah": 7.66,
      "satuan": "MIKROGRAM/NANOMETERKUBIK",
      "tahun": 2022
    },
    {
      "id": 3,
      "indikator_parameter": "SO2",
      "jumlah": 8.3,
      "satuan": "MIKROGRAM/NANOMETERKUBIK",
      "tahun": 2023
    },
    {
      "id": 4,
      "indikator_parameter": "NO2",
      "jumlah": 7.66,
      "satuan": "MIKROGRAM/NANOMETERKUBIK",
      "tahun": 2023
    }
  ];

  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedParameter, setSelectedParameter] = useState('all');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const yearMatch = selectedYear === 'all' || item.tahun.toString() === selectedYear;
      const parameterMatch = selectedParameter === 'all' || item.indikator_parameter === selectedParameter;
      return yearMatch && parameterMatch;
    });
  }, [selectedYear, selectedParameter]);

  const chartData = useMemo(() => {
    const grouped = {};
    filteredData.forEach(item => {
      if (!grouped[item.tahun]) {
        grouped[item.tahun] = {};
      }
      grouped[item.tahun][item.indikator_parameter] = item.jumlah;
      grouped[item.tahun].tahun = item.tahun;
    });
    return Object.values(grouped);
  }, [filteredData]);

  return (
    <>
      <header>
        <NavBarWithOutEffect />
      </header>
      <main>
        <div className="container border-t-4 border-green-700 rounded-md shadow-md mx-auto mt-28 mb-12 p-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-light text-green-600">Kualitas Lingkungan Udara Di Kabupaten Majalengka</h1>
            <p className="text-gray-600">Data monitoring kualitas udara di Kabupaten Majalengka dari tahun 2022-2023</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Parameter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Parameter</SelectItem>
                  <SelectItem value="SO2">SO2</SelectItem>
                  <SelectItem value="NO2">NO2</SelectItem>
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
                      <CardTitle className="text-lg">{item.indikator_parameter}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold">{item.jumlah}</span>
                        <span className="text-gray-500">Tahun {item.tahun}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{item.satuan}</p>
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
                        <h3 className="font-medium">{item.indikator_parameter}</h3>
                        <p className="text-sm text-gray-500">Tahun {item.tahun}</p>
                        <p className="text-xs text-gray-500">{item.satuan}</p>
                      </div>
                      <span className="text-2xl font-bold">{item.jumlah}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Tahun</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead>Satuan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.indikator_parameter}</TableCell>
                      <TableCell>{item.tahun}</TableCell>
                      <TableCell>{item.jumlah}</TableCell>
                      <TableCell>{item.satuan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="chart" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="SO2" 
                        name="SO2" 
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="NO2" 
                        name="NO2" 
                        stroke="#16a34a"
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

export default AirQualityDashboard;