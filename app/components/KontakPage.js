"use client";
import dynamic from "next/dynamic";
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Disable SSR for Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function KontakPage() {
  // Custom icon for marker
  const markerIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
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
              <MapContainer
                center={[-6.836018, 108.230415]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[-6.836018, 108.230415]} icon={markerIcon}>
                  <Popup>
                    <div>
                      <h3 className="font-bold">Dinas Lingkungan Hidup Majalengka</h3>
                      <p>Jl. KH. Abdul Halim No.311, Majalengka Kulon, Kec. Majalengka, Kabupaten Majalengka</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
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
  );
}

// Contact Item Component
const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-green-800">{label}</h4>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

// Social Media Link Component
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