'use client';

import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { useEffect, useRef } from 'react';
import Feature from 'ol/Feature';
import Icon from 'ol/style/Icon'; 
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';

export default function ContactPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([108.2406735, -6.8384226]), // Koordinat DLH Kabupaten Majalengka
          zoom: 15,
        }),
      });

      // Custom icon untuk marker
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([108.2406735, -6.8384226])), // Koordinat DLH Kabupaten Majalengka
        name: 'Dinas Lingkungan Hidup Kabupaten Majalengka',
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 0.05,
          src: 'https://cdn-icons-png.flaticon.com/512/854/854866.png', // Ganti URL jika ingin ikon lain
        }),
      });

      iconFeature.setStyle(iconStyle);

      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,

      });

      map.addLayer(vectorLayer);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white py-6 text-center">
              <h1 className="text-4xl font-bold">Dinas Lingkungan Hidup</h1>
              <p className="text-xl mt-2">Kabupaten Majalengka</p>
            </div>

            {/* Content Container */}
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Map Section */}
              <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
                <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                  Informasi Kontak
                </h2>
                <Link href="https://www.google.com/maps/place/Dinas+Lingkungan+Hidup+Kabupaten+Majalengka/@-6.8384173,108.2380986,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6f25f5cdb7670f:0x3871ec69971dc405!8m2!3d-6.8384226!4d108.2406735!16s%2Fg%2F11f5h2ty9w?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoJLDEwMjExMjM0SAFQAw%3D%3D">
                  <ContactItem
                    icon={<MapPin className="text-green-600" />}
                    label="Alamat"
                    value="Jl. Gerakan Koperasi No.38, Majalengka Wetan, Kec. Majalengka, Kabupaten Majalengka, Jawa Barat 45411."
                  />
                </Link>

                <ContactItem
                  icon={<Mail className="text-green-600" />}
                  label="Email"
                  value="dlh.majalengka@gmail.com"
                />

                <ContactItem
                  icon={<Phone className="text-green-600" />}
                  label="Telepon"
                  value="(0233) 281671"
                />

                {/* Social Media Links */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">
                    Temukan Kami
                  </h3>
                  <div className="flex space-x-4">
                    <SocialLink
                      icon={<Facebook className="w-6 h-6" />}
                      href="https://www.facebook.com/dlh.majalengka.9/"
                    />
                    <SocialLink
                      icon={<Instagram className="w-6 h-6" />}
                      href="https://www.instagram.com/dlh.majalengka/"
                    />
                    <SocialLink
                      icon={<Twitter className="w-6 h-6" />}
                      href="https://www.twitter.com/dlh_majalengka"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Komponen untuk Item Kontak
const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-green-800">{label}</h4>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

// Komponen untuk Social Media Link
const SocialLink = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-600 hover:text-green-800 transition-colors transform hover:scale-110"
  >
    {icon}
  </a>
);