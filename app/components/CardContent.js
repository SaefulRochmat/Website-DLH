'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import infografis1 from "../../public/image/Infografik 1.png"
import infografis2 from "../../public/image/Infografik 2.png"
import infografis3 from "../../public/image/Infografik 3.png"

const CardItems = () => {
    const cardData = [
        {
          id: 1,
          title: "Bencana Alam di Kabupaten Majalengka Tahun 2021",
          description: "Kali ini pembahasan kita agak menakutkan bestie yaitu tentang Bencana Alam di Kabupaten Majalengka Tahun 2021. Bestie jika kalian mendengar kejadian bencana , apa sih yang kalian pikirkan??.",
          image: infografis1,
          tooltipText: "Klik untuk melihat detail",
          link: "https://opendata.majalengkakab.go.id/infografik/bencana-alam-di-kabupaten-majalengka-tahun-2021"
        },
        {
          id: 2,
          title: "Kondisi Lingkungan HIdup di Kabupaten Majalengka Tahun 2021",
          description: "Pada pembahasan kali ini, kita akan membahas tentang Kondisi Lingkungan Hidup Kabupaten Majalengka Tahun 2021 Bestie kira² bagaimana tanggapan kalian mengenai kondisi lingkungan hidup saat ini ??.",
          image: infografis2,
          tooltipText: "Klik untuk melihat detail",
          link: "https://opendata.majalengkakab.go.id/infografik/kondisi-lingkungan-hidup-di-kabupaten-majalengka-tahun-2021"
        },
        {
          id: 3,
          title: "Kondisi Pengelolaan Sampah di Kabupaten Majalengka Tahun 2023",
          description: "Pada tahun 2023 total timbunan sampah ternyata mengalami peningkatan bestie sebesar 382.069 timbunan sedangkan untuk persentase timbunan sampah yang ditangani mengalami penurunan sebanyak 33,05%.",
          image: infografis3,
          tooltipText: "Klik untuk melihat detail",
          link: "https://opendata.majalengkakab.go.id/infografik/kondisi-pengelolaan-sampah-di-kabupaten-majalengka-tahun-2023"
        }
    ];
    
    return (
        <div className="w-full max-w-[1200px] mx-auto mt-20 px-4 py-2 border-t-4 border-green-700 shadow-md sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-light mt-8 md:mt-12 mb-6 md:mb-8">
            Infografis
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cardData.map((card) => (
              <TooltipProvider key={card.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={card.link} className="block h-full">
                      <Card className="group rounded-none hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col">
                        <CardHeader className="p-4 sm:p-6">
                          <div className="relative w-full h-80 overflow-hidden">
                            <Image
                              src={card.image}
                              alt={`Card Image ${card.id}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              priority={card.id === 1}
                              className="object-fit lg:object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = `/api/placeholder/300/300?text=Image${card.id}`;
                              }}
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-4 sm:p-6">
                          <h2 className="text-lg sm:text-xl font-semibold group-hover:text-green-600 transition-colors duration-300">
                            {card.title}
                          </h2>
                          <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-3">
                            {card.description}
                          </p>
                        </CardContent>
                        <CardFooter className="p-4 sm:p-6">
                          <Button 
                            className="w-full rounded-none bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
                            variant="default"
                          >
                            <span className="text-sm sm:text-base">Lihat Detail</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{card.tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
    );
};

export default CardItems;