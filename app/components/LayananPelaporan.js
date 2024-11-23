'use client';
import { useState } from 'react';
import NavBarWithOutEffect from '../components/NavBarWithOutEffect';
import { AlertCircle, Send, User, FileText, MessageSquare } from 'lucide-react';

export default function InputLaporan() {
  const [formData, setFormData] = useState({
    judulLaporan: '',
    nama: '',
    deskripsi: '',
    kategori: '',
    lokasi: '',
    kontak: ''
  });

  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'deskripsi') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/laporan-masyarakat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.');
        setFormData({
          nama: '',
          judulLaporan: '',
          deskripsi: '',
          kategori: '',
          lokasi: '',
          kontak: ''
        });
        setCharCount(0);
      } else {
        alert('Gagal mengirim laporan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan sistem. Mohon coba beberapa saat lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Pencemaran Lingkungan',
    'Pengelolaan Sampah',
    'Kerusakan Lingkungan',
    'Pengaduan Lainnya'
  ];

  return (
    <>
      <header>
        <NavBarWithOutEffect />
      </header>
      <main className="min-h-screen pt-24 pb-12 relative">
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Panduan Section */}
          <div className="mb-8 backdrop-blur-md bg-white/30 rounded-lg shadow-lg border border-white/30 p-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowGuide(!showGuide)}
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-white" />
                <h3 className="text-lg font-semibold text-white">Panduan Pengisian Laporan</h3>
              </div>
              <span className="text-white">{showGuide ? '▼' : '▶'}</span>
            </div>
            
            {showGuide && (
              <div className="mt-4 text-white space-y-2">
                <p>• Isi semua field yang bertanda (*) karena wajib diisi</p>
                <p>• Berikan judul yang jelas dan spesifik</p>
                <p>• Tuliskan deskripsi kejadian secara detail</p>
                <p>• Sertakan lokasi kejadian selengkap mungkin</p>
                <p>• Pastikan informasi kontak yang diberikan aktif</p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="backdrop-blur-md bg-white/30 rounded-lg shadow-lg border border-white/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Form Pelaporan Masyarakat</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Field */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span>Nama Lengkap *</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors placeholder-white/60 text-white"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Kategori Field */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Kategori Laporan *
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:border-green-400 focus:ring-1 focus:ring-green-400 text-white"
                  required
                >
                  <option value="" className="bg-gray-800">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                  ))}
                </select>
              </div>

              {/* Judul Laporan Field */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <FileText size={18} />
                    <span>Judul Laporan *</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="judulLaporan"
                  value={formData.judulLaporan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors placeholder-white/60 text-white"
                  required
                  placeholder="Masukkan judul laporan"
                />
              </div>

              {/* Lokasi Field */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Lokasi Kejadian *
                </label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors placeholder-white/60 text-white"
                  required
                  placeholder="Masukkan lokasi kejadian secara detail"
                />
              </div>

              {/* Deskripsi Field */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={18} />
                    <span>Deskripsi Laporan *</span>
                  </div>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors placeholder-white/60 text-white min-h-[200px]"
                  required
                  placeholder="Jelaskan detail kejadian yang ingin dilaporkan"
                />
                <div className="text-right text-sm text-white/80 mt-1">
                  {charCount}/1000 karakter
                </div>
              </div>

              {/* Kontak Field */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Kontak Yang Bisa Dihubungi *
                </label>
                <input
                  type="text"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors placeholder-white/60 text-white"
                  required
                  placeholder="Nomor telepon atau email"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-md text-white
                    ${isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-500/80 hover:bg-green-600/80 backdrop-blur-sm transform hover:scale-105 transition-all'}
                  `}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}