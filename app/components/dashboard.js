'use client';
import StatisticsPage from './StatisticPage';
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FileText, 
  BarChart2, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('dashboard');
  const [laporanMasyarakat, setLaporanMasyarakat] = useState([]);
  const [laporanMasuk, setLaporanMasuk] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalLaporan: 0,
    laporanPending: 0,
    laporanDiproses: 0
  });

  // Close sidebar on mobile when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

  const fetchLaporanMasyarakat = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/laporan-masyarakat`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data laporan masyarakat');
      }

      const data = await response.json();
      setLaporanMasyarakat(data);
      setDashboardStats(prev => ({
        ...prev,
        totalLaporan: data.length,
        laporanPending: data.filter(l => l.status === 'menunggu').length
      }));
    } catch (error) {
      console.error('Error fetching laporan masyarakat:', error);
      alert('Gagal mengambil data laporan: ' + error.message);
    }
  };

  const fetchLaporanMasuk = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/laporan-masuk`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data laporan masuk');
      }

      const data = await response.json();
      setLaporanMasuk(data);
      setDashboardStats(prev => ({
        ...prev,
        laporanDiproses: data.length
      }));
    } catch (error) {
      console.error('Error fetching laporan masuk:', error);
      alert('Gagal mengambil data laporan masuk: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token
    alert('Anda telah logout.');
    window.location.href = '/login'; // Redirect ke halaman login
  };
  

  const handleProsesLaporan = async (laporanId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sesi anda telah berakhir. Silakan login kembali.');
        window.location.href = '/login';
        return;
      }

      const userId = 1; // Idealnya ambil dari token/session
      const tindakan = 'Diproses';

      // Proses laporan masuk
      const response = await fetch(`${BASE_URL}/api/laporan-masuk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          laporanMasyarakatId: laporanId,
          userId,
          tindakan
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memproses laporan');
      }

      // Update status laporan
      const updateResponse = await fetch(`${BASE_URL}/api/laporan-masyarakat/${laporanId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'Diproses'
        })
      });

      if (!updateResponse.ok) {
        throw new Error('Gagal mengupdate status laporan');
      }

      // Refresh data
      await fetchLaporanMasyarakat();
      await fetchLaporanMasuk();
      alert('Laporan berhasil diproses');
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan: ' + error.message);
    }
  };

  useEffect(() => {
    fetchLaporanMasyarakat();
    fetchLaporanMasuk();
  }, []);

  const Sidebar = () => {
    const menuItems = [
      { 
        icon: <Home className="w-5 h-5" />, 
        label: 'Dashboard', 
        key: 'dashboard',
        badge: dashboardStats.totalLaporan
      },
      { 
        icon: <FileText className="w-5 h-5" />, 
        label: 'Laporan', 
        key: 'laporan',
        badge: dashboardStats.laporanPending
      },
      { 
        icon: <BarChart2 className="w-5 h-5" />, 
        label: 'Statistik', 
        key: 'statistik',
        badge: dashboardStats.laporanDiproses
      },
      // { 
      //   icon: <Users className="w-5 h-5" />, 
      //   label: 'Pengguna', 
      //   key: 'pengguna' 
      // },
      // { 
      //   icon: <Settings className="w-5 h-5" />, 
      //   label: 'Pengaturan', 
      //   key: 'pengaturan' 
      // }
    ];

    const handleItemClick = (key) => {
      setActiveLink(key);
      setIsMobileMenuOpen(false);
    };

    return (
      <>
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-purple-600 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          className={`
            fixed left-0 top-0 h-screen 
            bg-gradient-to-b from-purple-600 to-blue-600 
            text-white transition-all duration-300 ease-in-out 
            shadow-xl z-40
            md:translate-x-0
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isExpanded ? 'md:w-64' : 'md:w-16'}
          `}
          >
          <div 
            className="hidden md:block absolute top-4 right-[-16px] bg-blue-700 rounded-full p-1 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>

          <div className="p-4 flex items-center justify-center mt-4">
            {(isExpanded || isMobileMenuOpen) ? (
              <h2 className="text-xl font-bold">Admin Panel</h2>
            ) : (
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                A
              </div>
            )}
          </div>

          <nav className="mt-8">
            {menuItems.map((item) => (
              <div 
                key={item.key} 
                onClick={() => handleItemClick(item.key)}
                className={`
                  relative flex items-center p-3 mx-2 my-1 rounded-lg 
                  transition-all duration-200 ease-in-out cursor-pointer
                  ${activeLink === item.key 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10 text-white/80'}
                `}
              >
                {item.icon}
                {(isExpanded || isMobileMenuOpen) && (
                  <span className="ml-3 text-sm font-medium">
                    {item.label}
                  </span>
                )}
                {item.badge !== undefined && item.badge > 0 && (
                  <div className="absolute right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {item.badge}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div 
            className={`relative flex items-center p-3 mx-2 my-1 rounded-lg 
              transition-all duration-200 ease-in-out cursor-pointer 
              hover:bg-red-600 hover:text-white`}
            onClick={handleLogout}
            >
            <X className="w-5 h-5" />
            {(isExpanded || isMobileMenuOpen) && (
              <span className="ml-3 text-sm font-medium">
                Logout
              </span>
            )}
          </div>


          {(isExpanded || isMobileMenuOpen) && (
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-xs font-light">Selamat Datang</p>
                <p className="text-sm font-semibold mt-1">Admin</p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const ResponsiveTable = ({ data, columns, type }) => {
    return (
      <>
      {/* Mobile view - card layout */}
      <div className="block md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            {columns.map((column, index) => (
              <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                <span className="text-sm font-medium text-gray-500">
                  {column.header}
                </span>
                <span className="text-sm text-gray-900">
                  {column.render(item)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop view - table layout */}
      <div className="hidden md:block overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {columns.map((column, index) => (
                      <td 
                        key={index} 
                        className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap"
                      >
                        {column.render(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-16 lg:ml-64">
        <div className="mt-16 md:mt-0">
          {activeLink === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-sm">Total Laporan</h2>
                  <p className="text-2xl font-bold mt-2">{dashboardStats.totalLaporan}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-sm">Laporan Pending</h2>
                  <p className="text-2xl font-bold mt-2">{dashboardStats.laporanPending}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-gray-500 text-sm">Laporan Diproses</h2>
                  <p className="text-2xl font-bold mt-2">{dashboardStats.laporanDiproses}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Laporan Diproses</h1>
                <ResponsiveTable
                  data={laporanMasuk}
                  columns={[
                    {
                      header: 'ID',
                      render: (item) => item.id
                    },
                    {
                      header: 'Judul Laporan',
                      render: (item) => (
                        <div className="max-w-xs md:max-w-sm truncate">
                          {item.laporanMasyarakat.judulLaporan}
                        </div>
                      )
                    },
                    {
                      header: 'Nama Pelapor',
                      render: (item) => (
                        <div className="max-w-[150px] truncate">
                          {item.laporanMasyarakat.nama}
                        </div>
                      )
                    },
                    {
                      header: 'Tindakan',
                      render: (item) => (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.tindakan}
                        </span>
                      )
                    },
                    {
                      header: 'Tanggal',
                      render: (item) => (
                        <div className="whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            </div>
          )}

          {activeLink === 'laporan' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Daftar Laporan Masuk</h1>
              <ResponsiveTable
                data={laporanMasyarakat}
                columns={[
                  {
                    header: 'ID',
                    render: (item) => item.id
                  },
                  {
                    header: 'Judul Laporan',
                    render: (item) => (
                      <div className="max-w-xs md:max-w-sm truncate">
                        {item.judulLaporan}
                      </div>
                    )
                  },
                  {
                    header: 'Nama Pelapor',
                    render: (item) => (
                      <div className="max-w-[150px] truncate">
                        {item.nama}
                      </div>
                    )
                  },
                  {
                    header: 'Kategori',
                    render: (item) => (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {item.kategori}
                      </span>
                    )
                  },
                  {
                    header: 'Status',
                    render: (item) => (
                      <span className={`
                        inline-flex px-2 py-1 text-xs font-medium rounded-full
                        ${item.status === 'menunggu' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                        }
                      `}>
                        {item.status}
                      </span>
                    )
                  },
                  {
                    header: 'Aksi',
                    render: (item) => (
                      <button 
                        onClick={() => handleProsesLaporan(item.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.status !== 'menunggu'}
                      >
                        Proses
                      </button>
                    )
                  }
                ]}
              />
            </div>
          )}
        </div>
        {activeLink === 'statistik' && (
          <StatisticsPage 
            laporanMasyarakat={laporanMasyarakat}
            laporanMasuk={laporanMasuk}
          />
        )}
      </main>
    </div>
    
  );
};

export default Dashboard;