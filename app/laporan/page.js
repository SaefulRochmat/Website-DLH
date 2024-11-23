import InputLaporan from "../components/LayananPelaporan";

export async function generateMetadata() {
  return {
    title: 'Layanan | Input Laporan',
    description: 'Halaman Pelayanan Input Laporan Lingkungan Hidup Kabupaten Majalengka.',
  };
}

export default function HalamanPelaporan () {
  return (
    <>
      <InputLaporan/>
    </>
  );
}