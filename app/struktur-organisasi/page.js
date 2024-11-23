import Footer from "../components/footer";
import NavBarWithOutEffect from "../components/NavBarWithOutEffect";
import OrgStructure from "../components/StrukturOraganisasi";

export async function generateMetadata() {
    return {
        title: 'Struktur Organisasi',
        description: 'Struktur Organisasi Dinas Lingkungan Hidup Kabupaten Majalengka.'
    };
}

export default function StrukturOrganisasi() {
    return (
        <>
            <NavBarWithOutEffect/>

            <OrgStructure/>

            <Footer/>
        </>
    );
}