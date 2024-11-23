'use client';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar } from 'lucide-react';

const StatisticsPage = ({ laporanMasyarakat, laporanMasuk }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Generate data for trends (last 7 days / 30 days)
  const generateTrendsData = () => {
    const today = new Date();
    const data = [];
    const daysToShow = selectedPeriod === 'week' ? 7 : 30;

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const masukCount = laporanMasyarakat.filter(item => 
        item.createdAt.split('T')[0] === dateStr
      ).length;

      const diprosesCount = laporanMasuk.filter(item =>
        item.createdAt.split('T')[0] === dateStr
      ).length;

      data.push({
        date: date.toLocaleDateString('id-ID', { 
          day: 'numeric',
          month: 'short'
        }),
        masuk: masukCount,
        diproses: diprosesCount
      });
    }
    return data;
  };

  // Calculate category statistics
  const categoryStats = laporanMasyarakat.reduce((acc, curr) => {
    acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryStats).map(([name, value]) => ({
    name,
    value
  }));

  // Status distribution data
  const statusData = [
    {
      name: 'Menunggu',
      value: laporanMasyarakat.filter(item => item.status === 'menunggu').length
    },
    {
      name: 'Diproses',
      value: laporanMasyarakat.filter(item => item.status === 'Diproses').length
    }
  ];

  // Colors for charts
  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'];
  const STATUS_COLORS = ['#F59E0B', '#10B981'];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-medium text-sm text-gray-600">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Statistik Laporan</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="form-select text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="week">7 Hari Terakhir</option>
            <option value="month">30 Hari Terakhir</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-90">Total Laporan</h3>
          <p className="text-3xl font-bold mt-2">{laporanMasyarakat.length}</p>
          <div className="mt-4 text-sm opacity-75">
            Semua laporan yang masuk
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-90">Laporan Diproses</h3>
          <p className="text-3xl font-bold mt-2">{laporanMasuk.length}</p>
          <div className="mt-4 text-sm opacity-75">
            Laporan yang sedang ditangani
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-90">Tingkat Penyelesaian</h3>
          <p className="text-3xl font-bold mt-2">
            {((laporanMasuk.length / (laporanMasyarakat.length || 1)) * 100).toFixed(1)}%
          </p>
          <div className="mt-4 text-sm opacity-75">
            Rata-rata penyelesaian laporan
          </div>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-6">Tren Laporan</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateTrendsData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="masuk"
                name="Laporan Masuk"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="diproses"
                name="Laporan Diproses"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category and Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-6">Distribusi Kategori</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-6">Status Laporan</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Jumlah Laporan"
                  radius={[4, 4, 0, 0]}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;