import ContactPage from "../components/KontakPage";

export async function generateMetadata() {
  return {
    title: 'Kontak | Dinas Lingkungan Hidup Majalengka',
    description: 'Informasi Kontak Dinas Lingkungan Hidup di Kabupaten Majalengka.',
  };
}


export default function HalamanKontak () {
  return (
    <>
      <ContactPage/>
    </>
  );
}