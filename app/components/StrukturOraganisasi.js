'use client';
import React, { useState } from 'react';
import { UserCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import StrukturImage from '../../public/image/Struktur-Organisasi.png'

const OrgStructure = () => {
  const [expandedDepts, setExpandedDepts] = useState({});

  const orgData = {
    name: "Drs. AGUS PERMANA, MP.",
    title: "KEPALA DINAS",
    nip: "19700322 199003 1 005",
    children: [
      {
        name: "KELOMPOK JABATAN FUNGSIONAL",
        title: "",
        children: []
      },
      {
        name: "NAWAWI, S.P",
        title: "SEKRETARIS",
        nip: "19720612 200003 1 005",
        children: [
          {
            name: "RADEN DEWI YENI LAKSMI, S.Kom.",
            title: "KEPALA SUB BAGIAN UMUM DAN KEUANGAN",
            nip: "19661227 199203 2 005",
            children: []
          },
          {
            name: "ENOK ERNAWATI, SE",
            title: "FUNGSIONAL PERENCANA",
            nip: "19800130 201001 2 001",
            children: []
          }
        ]
      },
      {
        name: "RIDWANUDIN, AM.Kep., S.K.M",
        title: "KEPALA BIDANG PENATAAN DAN PENAATAN LINGKUNGAN HIDUP",
        nip: "19730905 199503 1 001",
        children: [
          {
            name: "IMAN, SKM., M.P.H",
            title: "FUNGSIONAL PENGENDALI DAMPAK LINGKUNGAN",
            nip: "19811005 200801 1 005",
            children: []
          },
          {
            name: "OTONG MUHAMAD ENDE JUHANA, S.Pd",
            title: "FUNGSIONAL PENGENDALI DAMPAK LINGKUNGAN",
            nip: "19660513 198610 1 003",
            children: []
          },
          {
            name: "BUDI ADHINUGRAHA, SE",
            title: "FUNGSIONAL PENGAWAS LINGKUNGAN HIDUP",
            nip: "19790326 201001 1 008",
            children: []
          }
        ]
      },
      {
        name: "RICKY FIRMANSYAH GUNAWAN, S.Kol, MM",
        title: "KEPALA BIDANG PENGELOLAAN SAMPAH, LIMBAH B3, DAN PENINGKATAN KAPASITAS LINGKUNGAN HIDUP",
        nip: "19861008 201001 1 005",
        children: [
          {
            name: "PIPIN NOVIYAWATY HAMNUS, S.Sos.",
            title: "FUNGSIONAL PENYULUH LINGKUNGAN HIDUP",
            nip: "19721128 200801 2 003",
            children: []
          },
          {
            name: "TOTO RUHARTO, AMKl., S.Sos., S.KM",
            title: "FUNGSIONAL PENGENDALI DAMPAK LINGKUNGAN",
            nip: "19670524 098803 1 004",
            children: []
          }
        ]
      },
      {
        name: "AGUNG BUDIONO, S.TP., MT.",
        title: "KEPALA BIDANG PENGENDALIAN PENCEMARAN DAN KERUSAKAN LINGKUNGAN HIDUP",
        nip: "19811007 200501 1 006",
        children: [
          {
            name: "H. NANA ROHMANA, S.Sos.,M.Si.",
            title: "FUNGSIONAL PENGENDALI DAMPAK LINGKUNGAN",
            nip: "19741211 199601 1 001",
            children: []
          },
          {
            name: "TITIN WARTINI, S.Pd., S.IP., M.Kes",
            title: "FUNGSIONAL PENYULUH LINGKUNGAN HIDUP",
            nip: "19700608 199003 2 001",
            children: []
          }
        ]
      }
    ]
  };

  const toggleDepartment = (name) => {
    setExpandedDepts(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const renderPerson = (person, level = 0) => {
    const hasChildren = person.children && person.children.length > 0;
    const isExpanded = expandedDepts[person.name];

    return (
      <div key={person.name} className="w-full">
        <div 
          className={`
            flex flex-col p-4 my-2 rounded-lg
            ${level === 0 ? 'bg-emerald-700 text-white' : 'bg-white border border-emerald-200'}
            ${hasChildren ? 'cursor-pointer hover:bg-emerald-300 hover:border-emerald-300' : ''}
            shadow-md transition-all duration-200
          `}
          onClick={() => hasChildren && toggleDepartment(person.name)}
        >
          <div className="flex items-center w-full">
            <UserCircle2 className={`w-8 h-8 mr-3 flex-shrink-0 ${level === 0 ? 'text-emerald-100' : 'text-emerald-600'}`} />
            <div className="flex-1">
              <div className="font-semibold">{person.name}</div>
              <div className={`text-sm mt-1 ${level === 0 ? 'text-emerald-100' : 'text-emerald-600'}`}>{person.title}</div>
              {person.nip && (
                <div className={`text-sm ${level === 0 ? 'text-emerald-100' : 'text-emerald-500'}`}>NIP: {person.nip}</div>
              )}
            </div>
            {hasChildren && (
              <div className="ml-4">
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
              </div>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className={`ml-8 pl-4 border-l-2 border-emerald-300`}>
            {person.children.map(child => renderPerson(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto mt-24 p-4 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div>
        <Image src={StrukturImage} width={0} height={0} alt='Struktur Organisasi DLH Majalengka'
          className='bg-cover'
        />
      </div>
      <div className="space-y-4 mb-12">
        {renderPerson(orgData)}
      </div>
    </div>
  );
};

export default OrgStructure;