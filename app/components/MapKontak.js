'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Atur lokasi DLH Kabupaten Majalengka
const DLH_COORDINATES = [-6.8384226,108.2406735]; // Ganti dengan koordinat yang benar jika berbeda

// Custom icon untuk marker
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png', // Ubah URL jika ingin ikon lain
  iconSize: [38, 38],
});

export default function MapKontak() {
  useEffect(() => {
    // Perbaiki masalah ukuran peta saat container berubah
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }, []);

  return (
    <MapContainer
      center={DLH_COORDINATES}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={DLH_COORDINATES} icon={customIcon}>
        <Popup>Dinas Lingkungan Hidup Kabupaten Majalengka</Popup>
      </Marker>
    </MapContainer>
  );
}
