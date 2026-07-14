import React from 'react';
import { Property, formatPrice } from '../types';
import { BedDouble, Bath, Square, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onInterest: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

export default function PropertyCard({ property, onInterest, onViewDetails }: PropertyCardProps) {
  return (
    <article 
      id={`property-card-${property.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => onViewDetails(property)}
    >
      {/* Property Image Cover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={property.titulo}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/0 to-transparent opacity-80" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-sm">
            {property.tipo}
          </span>
          <span className="rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
            {property.bairro}
          </span>
        </div>

        {/* Location Display over Image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-100 drop-shadow-sm">
            {property.bairro}, {property.cidade}
          </span>
        </div>
      </div>

      {/* Property Information */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="font-sans text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {property.titulo}
          </h3>
          
          {/* Price Tag */}
          <div className="mt-2.5 flex items-baseline">
            <span className="font-mono text-2xl font-extrabold tracking-tight text-slate-900">
              {formatPrice(property.valor)}
            </span>
            <span className="ml-1 text-xs font-medium text-slate-500">
              / Valor Final
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500 font-normal">
            {property.descricao}
          </p>
        </div>

        {/* Property Specs Indicators */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-slate-600">
          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 py-2 text-center">
            <div className="flex items-center gap-1 text-slate-800">
              <BedDouble className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-bold font-mono">{property.quartos}</span>
            </div>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Quartos</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 py-2 text-center">
            <div className="flex items-center gap-1 text-slate-800">
              <Bath className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-bold font-mono">{property.banheiros}</span>
            </div>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Banhs</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 py-2 text-center">
            <div className="flex items-center gap-1 text-slate-800">
              <Square className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-sm font-bold font-mono">{property.area}m²</span>
            </div>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 font-medium">Área</span>
          </div>
        </div>

        {/* Button: Tenho Interesse */}
        <div className="mt-5" onClick={(e) => e.stopPropagation()}>
          <button
            id={`btn-interesse-${property.id}`}
            onClick={() => onInterest(property)}
            className="flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 text-xs font-bold tracking-wide text-white transition-all duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 active:scale-[0.98]"
          >
            Tenho Interesse
          </button>
        </div>
      </div>
    </article>
  );
}
