'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SaveEarth from '../../public/image/SaveEarth.png';
import Kantor from '../../public/image/kantor.png';
import Baner1 from '../../public/image/baner1.png';

export default function ImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const totalSlides = 4;

    const images = [
        {
            id: 1,
            url: SaveEarth,
            alt: "Save earth"
        },
        {
            id: 2,
            url: Kantor,
            alt: "Kantor DLH Majalengka"
        },
        {
            id: 3,
            url: Baner1,
            alt: "Baner 1"
        },
        {
            id: 4,
            url: "https://source.unsplash.com/random/1920x1080/?ocean",
            alt: "Ocean Random"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
            window.location.hash = `slide${currentSlide === totalSlides ? 1 : currentSlide + 1}`;
        }, 3000);

        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div className="w-[980px] h-[400px] rounded-md border-t-4 border-green-300 shadow-lg m-auto mt-8 p-4">
            <div className="carousel w-full h-full">
                {images.map((image, index) => (
                    <div 
                        key={image.id} 
                        id={`slide${image.id}`} 
                        className="carousel-item relative w-full"
                    >
                        <Image
                            src={image.url}
                            alt={image.alt}
                            width={0}
                            height={0}
                            className="w-full h-full object-cover"  // Menambahkan object-cover untuk memastikan gambar mengisi container dengan baik
                            loading="lazy"  // Lazy loading untuk performa
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <button 
                                onClick={() => {
                                    const prevSlide = image.id === 1 ? totalSlides : image.id - 1;
                                    setCurrentSlide(prevSlide);
                                    window.location.hash = `slide${prevSlide}`;
                                }} 
                                className="btn btn-circle bg-black/50 text-white hover:bg-black/70"  // Styling untuk button agar lebih visible
                            >
                                ❮
                            </button>
                            <button 
                                onClick={() => {
                                    const nextSlide = image.id === totalSlides ? 1 : image.id + 1;
                                    setCurrentSlide(nextSlide);
                                    window.location.hash = `slide${nextSlide}`;
                                }} 
                                className="btn btn-circle bg-black/50 text-white hover:bg-black/70"
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}