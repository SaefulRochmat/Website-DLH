import dynamic from "next/dynamic";
import Footer from "../components/footer";
import NavBarWithOutEffect from "../components/NavBarWithOutEffect";

export async function generateMetadata() {
	return {
		title: "Kontak | Dinas Lingkungan Hidup Majalengka",
		description:
			"Informasi Kontak Dinas Lingkungan Hidup di Kabupaten Majalengka.",
	};
}

const ContactPage = dynamic(() => import("../components/KontakPage"), {
	ssr: false,
});
export default function HalamanKontak() {
	return (
		<>
			<NavBarWithOutEffect />
			<ContactPage />
			<Footer />
		</>
	);
}
