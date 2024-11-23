import NavBar from "./components/navbar";
import HeroImage from "./components/HeroImage";
import Footer from "./components/footer";
import CardItems from "./components/CardContent";
import OfficeHistory from "./components/OfficeHistory";

// Fungsi generateMetadata untuk meningkatkan SEO
export async function generateMetadata() {
    return {
      title: 'Home | Dinas Lingkungan Hidup Majalengka',
      description: 'Website Resmi Dinas Lingkungan Hidup Kabupaten Majalengka.',
    };
  }

export default function HomePage() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                {/* Hero Image */}
                <HeroImage/>

                {/* Profile */}
                <OfficeHistory />

                {/* Card content */}
                <CardItems />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
        
    );
}