'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Kantor from '../../public/image/kantor.png'
import NavBarWithOutEffect from './NavBarWithOutEffect';
import Footer from './footer';


//   const [currentSlide, setCurrentSlide] = useState(0);
//   const images = [
//     'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
//     'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww',
//     'https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fHww'
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative h-[680px] overflow-hidden">
//       <div className="absolute w-full h-full transition-transform duration-500">
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className={`absolute w-full h-full transition-opacity duration-500 ${
//               currentSlide === index ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
//       >
//         <ChevronLeft className="h-6 w-6" />
//       </button>
//       <button
//         onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
//       >
//         <ChevronRight className="h-6 w-6" />
//       </button>
//     </div>
//   );
// };

const Section = ({ title, children }) => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-green-700 mb-6">{title}</h2>
      <Card className="w-full">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );

const VisiMisi = () => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-green-700 mb-6">Visi & Misi</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "Terwujudnya Majalengka yang Bersih, Hijau, dan Berkelanjutan"
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Misi</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Meningkatkan kualitas lingkungan hidup</li>
            <li>Mengembangkan sistem pengelolaan sampah yang terpadu</li>
            <li>Meningkatkan kesadaran masyarakat terhadap lingkungan</li>
            <li>Memperkuat sistem pengawasan dan pengendalian pencemaran</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
);

const DLHProfile = () => {
  return (
    <>
        <NavBarWithOutEffect/>

        <div className="min-h-screen bg-gray-50">
        <div className='max-w-full'>
            <Image src={Kantor} width={0} height={0} alt='Kantor Dinas Lingkungan Hidup Majalengka' 
            className='bg-cover'
            />
        </div>
        
        <main className="container mx-auto px-6 py-8">
            <Section title="Sejarah">
            <p className="text-gray-700 leading-relaxed">
                Dinas Lingkungan Hidup Kabupaten Majalengka dibentuk berdasarkan Peraturan Daerah
                Kabupaten Majalengka Nomor 14 Tahun 2016 tentang Pembentukan dan Susunan
                Perangkat Daerah Kabupaten Majalengka.
            </p>
            </Section>

            <Section title="Dasar Hukum">
            <ul className="list-disc list-inside space-y-4 text-gray-700">
                <li>UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup</li>
                <li>Peraturan Daerah Kabupaten Majalengka Nomor 14 Tahun 2016</li>
                <li>Peraturan Bupati Majalengka tentang Kedudukan, Susunan Organisasi, Tugas Pokok dan Fungsi DLH</li>
            </ul>
            </Section>

            <Section title="Tugas Pokok dan Fungsi">
            <div className="space-y-6">
                <div>
                <h3 className="text-xl font-semibold mb-4">Tugas Pokok:</h3>
                <p className="text-gray-700">
                    Melaksanakan urusan pemerintahan daerah di bidang lingkungan hidup berdasarkan
                    asas otonomi dan tugas pembantuan.
                </p>
                </div>
                <div>
                <h3 className="text-xl font-semibold mb-4">Fungsi:</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>Perumusan kebijakan teknis di bidang lingkungan hidup</li>
                    <li>Penyelenggaraan urusan pemerintahan dan pelayanan umum</li>
                    <li>Pembinaan dan pelaksanaan tugas di bidang lingkungan hidup</li>
                    <li>Pengelolaan ketatausahaan Dinas</li>
                    <li>Pelaksanaan tugas lain yang diberikan oleh Bupati</li>
                </ul>
                </div>
            </div>
            </Section>

            <VisiMisi />
        </main>
        </div>

        <Footer/>
    </>
  );
};

export default DLHProfile;