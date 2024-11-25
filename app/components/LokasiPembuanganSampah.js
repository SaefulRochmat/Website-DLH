'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Factory, 
  Trash2, 
  PiggyBank,
  Recycle 
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WasteManagementMap = () => {
  const [visibleLayers, setVisibleLayers] = useState(['tps3r', 'bankSampah', 'tps', 'tpa']);
  const [customIcons, setCustomIcons] = useState(null);

  useEffect(() => {
    // Membuat custom icons untuk setiap tipe lokasi
    const icons = {
      tps3r: new L.Icon({
        iconUrl: '/leaflet/marker-icon-blue.png',
        iconRetinaUrl: '/leaflet/marker-icon-2x-blue.png',
        shadowUrl: '/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      bankSampah: new L.Icon({
        iconUrl: '/leaflet/marker-icon-green.png',
        iconRetinaUrl: '/leaflet/marker-icon-2x-green.png',
        shadowUrl: '/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      tps: new L.Icon({
        iconUrl: '/leaflet/marker-icon-red.png',
        iconRetinaUrl: '/leaflet/marker-icon-2x-red.png',
        shadowUrl: '/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      tpa: new L.Icon({
        iconUrl: '/leaflet/marker-icon-violet.png',
        iconRetinaUrl: '/leaflet/marker-icon-2x-violet.png',
        shadowUrl: '/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    };
    
    setCustomIcons(icons);
  }, []);

  // Detailed location data with more precise coordinates
  const locations = {
    tps3r: [
      { name: "Desa Kutamanggu", coordinates: [-6.7955, 108.2266], kecamatan: "Cigasong" },
      { name: "Desa Cikijing", coordinates: [-6.8098, 108.2432], kecamatan: "Cikijing" },
      { name: "Desa Malausma", coordinates: [-6.8355, 108.2187], kecamatan: "Malausma" },
      { name: "Desa Ligung Lor", coordinates: [-6.8212, 108.1976], kecamatan: "Ligung" },
      { name: "Desa Jatitujuh", coordinates: [-6.8432, 108.2543], kecamatan: "Jatitujuh" },
      { name: "Desa Babakan Anyar", coordinates: [-6.7876, 108.2098], kecamatan: "Kadipaten" },
      { name: "Desa Rajagaluh Lor", coordinates: [-6.8654, 108.2321], kecamatan: "Rajagaluh" },
      { name: "Desa Sindangkerta", coordinates: [-6.7765, 108.2543], kecamatan: "Maja" },
      { name: "Desa Banjaran", coordinates: [-6.8123, 108.2098], kecamatan: "Banjaran" },
      { name: "Desa Kramat Jaya", coordinates: [-6.8355, 108.2187], kecamatan: "Malausma" },
      { name: "Desa Manjeti", coordinates: [-6.7955, 108.2266], kecamatan: "Cigasong" },
      { name: "Desa Mekarsari", coordinates: [-6.8432, 108.2654], kecamatan: "Jatiwangi" },
      { name: "Desa Sukaraja Kulon", coordinates: [-6.8543, 108.2765], kecamatan: "Jatiwangi" },
      { name: "Desa Karyamukti", coordinates: [-6.8654, 108.2876], kecamatan: "Panyingkiran" },
      { name: "Kelurahan Majalengka Kulon", coordinates: [-6.8432, 108.2321], kecamatan: "Majalengka" }
    ],
    bankSampah: [
      { name: "Bank Sampah Majalengka Kulon", coordinates: [-6.8432, 108.2321], kecamatan: "Majalengka" },
      { name: "Bank Sampah Kertabasuki", coordinates: [-6.7765, 108.2543], kecamatan: "Maja" },
      { name: "Bank Sampah Jaya Makmur", coordinates: [-6.7876, 108.2098], kecamatan: "Kadipaten" },
      { name: "Bank Sampah Wana Bhakti", coordinates: [-6.7912, 108.2132], kecamatan: "Kadipaten" },
      { name: "Bank Sampah Makmur", coordinates: [-6.7945, 108.2176], kecamatan: "Kadipaten" },
      { name: "Bank Sampah Wana Lestari", coordinates: [-6.7988, 108.2209], kecamatan: "Kadipaten" },
      { name: "Bank Sampah Wanasari", coordinates: [-6.8021, 108.2243], kecamatan: "Kasokandel" },
      { name: "Bank Sampah Srikandi Maju", coordinates: [-6.8054, 108.2276], kecamatan: "Cigasong" }
    ],
    tps: [
      { name: "TPS Depo Kubang", coordinates: [-6.8432, 108.2321], kecamatan: "Majalengka Wetan" },
      { name: "TPS Pasar Sindangkasih", coordinates: [-6.7955, 108.2266], kecamatan: "Cigasong" },
      { name: "TPS Cijati", coordinates: [-6.8098, 108.2432], kecamatan: "Cijati" },
      { name: "TPS Kadipaten", coordinates: [-6.7876, 108.2098], kecamatan: "Kadipaten" },
      { name: "TPS Sumberjaya", coordinates: [-6.8212, 108.1976], kecamatan: "Sumberjaya" }
    ],
    tpa: [
      { name: "TPA Heuleut", coordinates: [-6.7868904,108.1839385], desa: "Heuleut", kecamatan: "Kadipaten" }
    ]
  };

  const [activeTab, setActiveTab] = useState("summary");
  const renderDataTable = (data) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Kecamatan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.kecamatan}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const markerColors = {
    tps3r: 'blue',
    bankSampah: 'green',
    tps: 'red',
    tpa: 'purple'
  };

  const createCustomIcon = (color) => L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color:${color};width:15px;height:15px;border-radius:50%;border:2px solid white;"></div>`,
    iconSize: [15, 15]
  });

  const toggleLayer = (layer) => {
    setVisibleLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer) 
        : [...prev, layer]
    );
  };


  if (!customIcons) return null;

  return (
    <>
        <main>
          <div>
            <Card className="w-full lg:w-[1200px] h-[500px] m-auto mt-28 mb-8 flex flex-col rounded-none border-t-4 border-t-green-700 shadow-md">
              <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <h1 className='text-lg text-green-600'>Peta Manajemen Sampah Majalengka</h1>
                    <div className="flex gap-2">
                      {Object.keys(locations).map(layer => (
                        <Badge 
                          key={layer} 
                          variant={visibleLayers.includes(layer) ? 'default' : 'secondary'}
                          onClick={() => toggleLayer(layer)}
                          className="cursor-pointer"
                        >
                          {layer.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow relative">
                  <MapContainer 
                    center={[-6.8355, 108.2187]} 
                    zoom={10} 
                    style={{ height: '100%', width: '100%' }}
                    className="z-10"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    
                    {Object.entries(locations).map(([type, items]) => 
                      visibleLayers.includes(type) && items.map((location, index) => (
                        <Marker 
                          key={`${type}-${index}`} 
                          position={location.coordinates}
                          icon={customIcons[type]}
                        >
                          <Popup>
                            <div>
                              <strong>{location.name}</strong>
                              <p>{location.kecamatan || location.kelurahan || 'Lokasi'}</p>
                              <Badge variant="outline">{type.toUpperCase()}</Badge>
                            </div>
                          </Popup>
                        </Marker>
                      ))
                    )}
                  </MapContainer>
              </CardContent>
            </Card>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full lg:w-[1200px] m-auto mb-10'>
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="summary">
                  <Recycle className="mr-2" /> Ringkasan
                </TabsTrigger>
                <TabsTrigger value="TPS3R">
                  <Factory className="mr-2" /> TPS3R
                </TabsTrigger>
                <TabsTrigger value="BankSampah">
                  <PiggyBank className="mr-2" /> Bank Sampah
                </TabsTrigger>
                <TabsTrigger value="TPS">
                  <Trash2 className="mr-2" /> TPS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistik Lokasi Pengelolaan Sampah</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold">{locations.tps3r.length}</h3>
                      <p>TPS3R</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold">{locations.bankSampah.length}</h3>
                      <p>Bank Sampah</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold">{locations.tps.length}</h3>
                      <p>TPS</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg text-center">
                      <h3 className="text-2xl font-bold">{locations.tpa.length}</h3>
                      <p>TPA</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="TPS3R">
                {renderDataTable(locations.tps3r)}
              </TabsContent>

              <TabsContent value="BankSampah">
                {renderDataTable(locations.bankSampah)}
              </TabsContent>

              <TabsContent value="TPS">
                {renderDataTable(locations.tps)}
              </TabsContent>
            </Tabs>
          </div>
        </main>
    </>
  );
};

export default WasteManagementMap;