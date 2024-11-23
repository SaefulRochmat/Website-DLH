import dynamic from "next/dynamic";

const Kontakpage = dynamic(() => import('../components/MapKontak'), {
    ssr: false,
});

export default Kontakpage;