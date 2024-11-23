'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79",
      title: "Selamat Datang di Website Resmi",
      subtitle: "Dinas Lingkungan Hidup Majalengka",
      desc: "Temukan solusi terbaik untuk kebutuhan Anda"
    },
    {
      url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9",
      title: "Menjaga Kelestarian Alam",
      subtitle: "Untuk Masa Depan Yang Lebih Baik",
      desc: "Mari berkontribusi untuk lingkungan kita"
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Bersama Membangun",
      subtitle: "Lingkungan Yang Berkelanjutan",
      desc: "Untuk generasi masa depan"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Ganti slide setiap 5 detik

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel slides */}
      <div className="h-full relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.url}')`,
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white px-4 animate-fadeIn">
                <h1 className="text-3xl md:text-6xl font-light mb-2 transform transition-all duration-700 translate-y-0 opacity-100">
                  {slide.title}
                  <br />
                  {slide.subtitle}
                </h1>
                <p className="text-lg font-light md:text-2xl mb-6 transform transition-all duration-700 delay-200 translate-y-0 opacity-100">
                  {slide.desc}
                </p>
                <Link 
                  href="/about" 
                  className="bg-slate-500 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;