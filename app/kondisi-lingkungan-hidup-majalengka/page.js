import EnvironmentalDashboard from "../components/EnvironmentalLingkungan";

export async function generateMetadata() {
  return {
    title: 'Publikasi Data | Kondisi Lingkungan Hidup Majalengka',
    description: 'Publikasi Data Kondisi Lingkungan Hidup di kabupaten Majalengka.',
  };
}

export default function KondisiLngkunganHidup() {
  return(
    <>
      <EnvironmentalDashboard/>
    </>
  );
}