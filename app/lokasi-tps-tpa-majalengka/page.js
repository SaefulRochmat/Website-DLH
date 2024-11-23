import WasteManagementMap from "../components/LokasiPembuanganSampah";

export async function generateMetadata() {
  return {
    title: 'Publikasi Data | Lokasi TPA & TPS di Majalengka',
    description: 'Publikasi Data Lokasi TPA & TPS di Kabupaten Majalengka.',
  };
}

export default function LokasiPembuangansampah() {
  return (
    <>
      <WasteManagementMap/>
    </>
  );
}