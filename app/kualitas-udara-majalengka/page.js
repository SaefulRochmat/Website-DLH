import AirQualityDashboard from "../components/EnvironmentalAirquality";

export async function generateMetadata() {
  return {
    title: 'Publikasi Data | Kualitas Udara di Majalengka',
    description: 'Publikasi Data Kualitas Udara di Kabupaten Majalengka.',
  };
}

export default function KondisiUdara() {
  return (
    <>
      <AirQualityDashboard/>
    </>
  );
}