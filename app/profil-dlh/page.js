import DLHProfile from "../components/ProfilDLH";

export async function generateMetadata() {
    return{
        title: 'Profile Dinas Lingkungan Hidup Majalengka',
        description: 'Halaman Profile Dinas Lingkungan Hidup Kabupaten Majalengka.',
    };
}

export default function ProfileDLH() {
    return(
        <>
            <DLHProfile/>
        </>
    );
}