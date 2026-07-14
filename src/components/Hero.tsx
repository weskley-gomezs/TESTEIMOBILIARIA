import React from 'react';
import { Search, MapPin, DollarSign, SlidersHorizontal, Eye } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onClearFilters: () => void;
}

const PROPERTY_TYPES = ['Todos', 'Casa', 'Apartamento', 'Cobertura', 'Studio', 'Loft'];

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  maxPrice,
  setMaxPrice,
  onClearFilters,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/45 via-slate-900 to-slate-950" />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="absolute -bottom-40 -left-10 h-[400px] w-[400px] rounded-full bg-slate-500/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-400 border border-emerald-500/25">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Frontend Integrado ao CRM SisteNext
          </div>
          
          <h1 className="mt-6 font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.1]">
            Imóveis Exclusivos <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Conexão Direta com CRM
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-300 font-light leading-relaxed">
            Descubra nossa curadoria de 6 propriedades de luxo fictícias. Clique em 
            <span className="font-semibold text-emerald-400"> "Tenho Interesse"</span> em qualquer imóvel para 
            demonstrar o envio automático do lead via payload JSON diretamente para o CRM SisteNext.
          </p>
        </div>

        {/* Filter component bar */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-emerald-500" />
              <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
                Filtrar Propriedades
              </h2>
            </div>
            
            {(searchQuery || selectedType !== 'Todos' || maxPrice < 10000000) && (
              <button 
                onClick={onClearFilters}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                Limpar Filtros
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Buscar por título, bairro ou cidade
              </label>
              <div className="relative">
                <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Ex: Cobertura, Jardins, Rio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pr-4 pl-10 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tipo de Imóvel
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 px-4 text-sm text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%2364748b' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'></path></svg>")`,
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '16px',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-slate-950 text-slate-200">
                    {type === 'Todos' ? 'Todos os Tipos' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Valor Máximo
                </label>
                <span className="text-xs font-bold text-emerald-400">
                  {maxPrice >= 10000000 
                    ? 'Qualquer valor' 
                    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>R$ 500mil</span>
                <span>R$ 5mi</span>
                <span>R$ 10mi+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
