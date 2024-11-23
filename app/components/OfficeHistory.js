import Image from "next/image";
import Kantor from "../../public/image/kantor.png"

export default function OfficeHistory() {
    return (
        <div className="w-full max-w-[1200px] mx-auto mt-12 lg:mt-12 px-4 shadow-md border-t-4 border-green-700 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 justify-between px-12 py-10 md:flex md:flex-row">               
                <div className="w-full px-4 py-2 font-light order-2 md:text-sm lg:text-base md:order-2">
                    <h1 className="text-lg text-green-600 font-semibold mb-2">Sejarah Singkat <br /> Dinas Lingkungan Hidup Majalengka</h1>
                    <p className="text-justify">Dinas Lingkungan Hidup Kabupaten Majalengka dibentuk sebagai bagian dari upaya pemerintah daerah 
                        untuk meningkatkan pengelolaan dan pelestarian lingkungan hidup. 
                        Awalnya, fungsi pengelolaan lingkungan berada di bawah dinas yang lebih luas cakupannya. 
                        Namun, seiring meningkatnya kebutuhan akan penanganan isu lingkungan, 
                        seperti pengelolaan sampah, pencemaran, dan dampak perubahan iklim, instansi ini resmi berdiri sendiri.
                        Melalui berbagai program dan kebijakan, DLH Majalengka terus beradaptasi untuk menjawab tantangan modern 
                        dengan berfokus pada pembangunan berkelanjutan, penegakan hukum lingkungan, dan peningkatan partisipasi masyarakat. 
                        Hingga saat ini, DLH Majalengka menjadi ujung tombak dalam menjaga kualitas lingkungan hidup di daerah.
                    </p>
                </div>
                <div className="avatar flex flex-col items-center order-1 md:order-1">
                    <div className="w-full md:w-[300px] lg:w-[500px] h-[250px]">
                        <Image 
                        src={Kantor}
                        alt="Kantor DLH"
                        width={0}
                        height={0}
                        className="bg-fit rounded-md border "
                        />
                    </div>
                    <h1 className="italic text-lg font-light mt-2 text-center">Kantor Dinas Lingkungan Hidup Majalengka</h1>
                </div>
            </div>
        </div>       
    );
}