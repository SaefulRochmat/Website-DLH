'use client';
import Link from "next/link";
import Logo from "../../public/logo/logo.jpg";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
    const [isHovered, setIsHovered] = useState({
        insta: false,
        fb: false
    });

    return (
        <footer className="footer footer-center bg-[#1d4f21] text-white p-10 transition-all duration-300">
            <aside className="transition-transform duration-300 hover:scale-105">
                <Link href="/">
                    <Image
                        src={Logo}
                        width={150}
                        height={150}
                        alt="Logo Dinas Lingkungan Hidup Majalengka"
                        className="fill-current hover:opacity-90 transition-opacity duration-300"
                    />
                </Link>
                <p className="font-bold text-lg hover:text-green-300 transition-colors duration-300">
                    Dinas Lingkungan Hidup.
                    <br />
                    Kabupaten Majalengka
                </p>
                <Link 
                    href="https://www.google.com/maps/place/Dinas+Lingkungan+Hidup+Kabupaten+Majalengka/@-6.8384173,108.2380986,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6f25f5cdb7670f:0x3871ec69971dc405!8m2!3d-6.8384226!4d108.2406735!16s%2Fg%2F11f5h2ty9w?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoJLDEwMjExMjM0SAFQAw%3D%3D"
                    className="text-sm max-w-xs mx-auto hover:text-green-200 transition-colors duration-300 mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p>
                        Jl. Gerakan Koperasi No.38, Majalengka Wetan, Kec. Majalengka, Kabupaten Majalengka, Jawa Barat 45411.
                    </p>
                </Link>
                <p className="text-sm hover:text-green-200 transition-colors duration-300 mt-4">
                    Copyright © {new Date().getFullYear()} - All right reserved
                </p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-6">
                    <Link 
                        href="https://www.instagram.com/dlh.majalengka/"
                        onMouseEnter={() => setIsHovered({...isHovered, insta: true})}
                        onMouseLeave={() => setIsHovered({...isHovered, insta: false})}
                        className="transform transition-transform duration-300 hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className={`fill-current transition-colors duration-300 ${
                                isHovered.insta ? 'text-pink-400' : 'text-white'
                            }`}
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </Link>
                    <Link 
                        href="https://www.facebook.com/dlh.majalengka.9/"
                        onMouseEnter={() => setIsHovered({...isHovered, fb: true})}
                        onMouseLeave={() => setIsHovered({...isHovered, fb: false})}
                        className="transform transition-transform duration-300 hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className={`fill-current transition-colors duration-300 ${
                                isHovered.fb ? 'text-blue-500' : 'text-white'
                            }`}
                        >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </Link>
                </div>
            </nav>
        </footer>
    );
}