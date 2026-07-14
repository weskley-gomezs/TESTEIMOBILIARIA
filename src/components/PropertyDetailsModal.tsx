import React, { useEffect } from 'react';
import { Property, formatPrice } from '../types';
import { X, BedDouble, Bath, Square, MapPin, CheckCircle, Phone, ArrowRight } from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onInterest: (property: Property) => void;
}

export default function PropertyDetailsModal({ property, onClose, onInterest }: PropertyDetailsModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (property) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [property]);

  if (!property) return null;

  return (
    <div id="details-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        id="details-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300 flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/40 text-white backdrop-blur-sm transition-all hover:bg-slate-900/60"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Large Image with highlights */}
        <div className="w-full md:w-1/2 relative bg-slate-100 min-h-[300px] md:min-h-full">
          <img
            src={property.image}
            alt={property.titulo}
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-3">
              {property.tipo}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {property.titulo}
            </h2>
            <p className="mt-2 text-sm text-slate-200 flex items-center gap-1.5 font-light">
              <MapPin className="h-4 w-4 text-emerald-400" />
              {property.bairro}, {property.cidade}
            </p>
          </div>
        </div>

        {/* Right Side: Detailed specs and descriptions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Valor do Imóvel
              </span>
              <span className="font-mono text-3xl font-extrabold tracking-tight text-emerald-600">
                {formatPrice(property.valor)}
              </span>
            </div>

            {/* Quick specifications */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center">
                <BedDouble className="mx-auto h-5 w-5 text-slate-700" />
                <span className="mt-1 block text-sm font-extrabold text-slate-900 font-mono">
                  {property.quartos}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Quartos
                </span>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center">
                <Bath className="mx-auto h-5 w-5 text-slate-700" />
                <span className="mt-1 block text-sm font-extrabold text-slate-900 font-mono">
                  {property.banheiros}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Banheiros
                </span>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center">
                <Square className="mx-auto h-4 w-4 text-slate-700" />
                <span className="mt-1.5 block text-sm font-extrabold text-slate-900 font-mono">
                  {property.area} m²
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Área Útil
                </span>
              </div>
            </div>

            {/* About text */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Descrição Completa
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 font-light">
                {property.descricao}
              </p>
            </div>

            {/* Features check list */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Características & Infraestrutura
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {property.caracteristicas.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to action panel */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <button
              onClick={() => {
                onInterest(property);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 px-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              <span>Tenho Interesse</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
            <p className="mt-2 text-center text-[10px] text-slate-400 font-mono">
              Integrado via API do CRM SisteNext
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
