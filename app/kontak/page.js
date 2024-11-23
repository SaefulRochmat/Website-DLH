import Footer from "../components/footer";
import ContactPage from "../components/KontakPage";
import NavBarWithOutEffect from "../components/NavBarWithOutEffect";

export async function generateMetadata() {
  return {
    title: 'Kontak | Dinas Lingkungan Hidup Majalengka',
    description: 'Informasi Kontak Dinas Lingkungan Hidup di Kabupaten Majalengka.',
  };
}

export default function HalamanKontak () {
  return (
    <>
      <NavBarWithOutEffect />
      <ContactPage/>
      <Footer/>
    </>
  );
}