"use client";
import dynamic from "next/dynamic";
import Footer from "../components/footer";
import NavBarWithOutEffect from "../components/NavBarWithOutEffect";

// const Map = dynamic(() => import("@/components/map"), {
// 	ssr: false,
// });
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
