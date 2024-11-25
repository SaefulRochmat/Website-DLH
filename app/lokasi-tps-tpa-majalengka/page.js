'use client'
import dynamic from "next/dynamic";
import Footer from "../components/footer";
import NavBarWithOutEffect from "../components/NavBarWithOutEffect";
import Head from "next/head";

const WasteManagementMap = dynamic(() => import("../components/LokasiPembuanganSampah"), {
	ssr: false,
});

export default function LokasiPembuangansampah() {
  return (
    <>
      <Head>
        <title>Publikasi Data | Lokasi TPA & TPS di Majalengka</title>
        <meta 
          name="description" 
          content="Publikasi Data Lokasi TPA & TPS di Kabupaten Majalengka." 
        />
      </Head>
      <NavBarWithOutEffect/>
        <WasteManagementMap/>
      <Footer/>
    </>
  );
}