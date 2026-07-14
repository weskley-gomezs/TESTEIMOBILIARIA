import React, { useState, useMemo } from 'react';
import { PROPERTIES, Property, formatPrice } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import InterestModal from './components/InterestModal';
import ApiDocumentation from './components/ApiDocumentation';
import ApiDemoModal from './components/ApiDemoModal';
import { Home, PhoneCall, Mail, ShieldCheck, MapPin, Sparkles, Building2, Terminal, ArrowRight } from 'lucide-react';

export default function App() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(10000000);

  // Modal States
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState<Property | null>(null);
  const [selectedPropertyInterest, setSelectedPropertyInterest] = useState<Property | null>(null);
  const [showApiDemoModal, setShowApiDemoModal] = useState(false);

  // Clear all filters handler
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('Todos');
    setMaxPrice(10000000);
  };

  // Filter properties in real-time based on state
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Search query matches title, neighborhood, or city
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === '' || 
        property.titulo.toLowerCase().includes(query) ||
        property.bairro.toLowerCase().includes(query) ||
        property.cidade.toLowerCase().includes(query);

      // Type selector match
      const matchesType = selectedType === 'Todos' || property.tipo === selectedType;

      // Price limit match
      const matchesPrice = property.valor <= maxPrice;

      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchQuery, selectedType, maxPrice]);

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Sticky Premium Header */}
      <Navbar onShowApiDemo={() => setShowApiDemoModal(true)} />

      {/* Hero Header & Filter Bar */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onClearFilters={handleClearFilters}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Properties Listing Section */}
        <section id="properties-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Curadoria Exclusiva
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Nossos Imóveis de Alto Padrão
              </h2>
              <p className="mt-2 text-sm text-slate-500 font-light max-w-xl">
                Selecione entre nossos {PROPERTIES.length} modelos projetados para demonstrar o comportamento perfeito de captura de Leads.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
              Mostrando <span className="font-bold text-slate-900">{filteredProperties.length}</span> de <span className="font-bold text-slate-900">{PROPERTIES.length}</span> imóveis
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onInterest={(prop) => setSelectedPropertyInterest(prop)}
                  onViewDetails={(prop) => setSelectedPropertyDetails(prop)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 bg-white p-8">
              <Building2 className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-base font-bold text-slate-900">Nenhum imóvel encontrado</h3>
              <p className="mt-1 text-sm text-slate-500 font-light max-w-md mx-auto">
                Não localizamos imóveis com as características ou limites de preço fornecidos. Tente ajustar seus filtros de pesquisa.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
              >
                Redefinir Filtros
              </button>
            </div>
          )}
        </section>

        {/* Feature integration banner split */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 to-slate-950" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">Desenvolvimento Desacoplado</span>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Por que escolher SisteNext CRM?</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Este site de modelo foi construído respeitando as melhores práticas de arquitetura web moderna. O frontend não possui estado persistente local nem requer servidores proxy intermediários. Cada clique de interesse converte-se em um payload assíncrono e limpo, direcionado à sua API.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <button
                onClick={() => setShowApiDemoModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 text-xs font-bold text-white transition-all shadow-lg shadow-emerald-900/10"
              >
                <Terminal className="h-4 w-4" />
                <span>Simular Teste de API</span>
              </button>
              <a
                href="#integration-section"
                className="flex items-center justify-center gap-1 rounded-xl bg-white/10 hover:bg-white/15 px-6 py-3.5 text-xs font-bold text-white transition-all border border-white/10"
              >
                <span>Ler Documentação</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Technical Integration Walkthrough */}
        <ApiDocumentation />

      </main>

      {/* Premium Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 md:py-16 text-slate-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4 border-b border-slate-100 pb-10">
            {/* Branding Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow">
                  <Home className="h-4 w-4" />
                </div>
                <span className="font-sans text-base font-extrabold tracking-tight text-slate-900">
                  SisteNext<span className="text-emerald-600">.</span>
                </span>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-slate-500 uppercase">
                  Modelo Frontend
                </span>
              </div>
              <p className="text-xs text-slate-500 font-light max-w-sm leading-relaxed">
                Um portal imobiliário demonstrativo de alta fidelidade visual. Projeto focado na agilidade, velocidade de carregamento e integração nativa com o sistema de gestão imobiliária SisteNext.
              </p>
            </div>

            {/* Simulated Contacts */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Imobiliária Boutique
              </h4>
              <ul className="space-y-2 text-xs font-light text-slate-500">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  Av. Paulista, 1000 - São Paulo, SP
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  (11) 4003-0000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  contato@sistenextimoveis.com
                </li>
              </ul>
            </div>

            {/* Architecture validation notes */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Padrões do Projeto
              </h4>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-light">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Sem Banco de Dados Local
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-light">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Sem Firebase ou Backend
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-light">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Integração 100% via API
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono">
            <p>© {new Date().getFullYear()} SisteNext Imóveis. Desenvolvido para demonstração técnica.</p>
            <p className="mt-2 sm:mt-0">Tecnologia integrada via SisteNext CRM API.</p>
          </div>
        </div>
      </footer>

      {/* MODALS INJECTION COMPONENT CONTAINER */}
      
      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedPropertyDetails}
        onClose={() => setSelectedPropertyDetails(null)}
        onInterest={(prop) => {
          setSelectedPropertyDetails(null);
          setSelectedPropertyInterest(prop);
        }}
      />

      {/* Lead Capture Modal / Form */}
      <InterestModal
        property={selectedPropertyInterest}
        onClose={() => setSelectedPropertyInterest(null)}
      />

      {/* Global API Spec and Demo Sandbox Modal */}
      {showApiDemoModal && (
        <ApiDemoModal onClose={() => setShowApiDemoModal(false)} />
      )}

    </div>
  );
}
