import React from 'react';
import { Home, ExternalLink, SlidersHorizontal, BookOpen } from 'lucide-react';

interface NavbarProps {
  onShowApiDemo: () => void;
}

export default function Navbar({ onShowApiDemo }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div id="navbar-container" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand/Logo */}
        <div id="navbar-logo" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/15">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <span className="font-sans text-lg font-extrabold tracking-tight text-slate-900">
              SisteNext<span className="text-emerald-600">.</span>
            </span>
            <span className="ml-1.5 rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-slate-600 uppercase">
              Imóveis
            </span>
          </div>
        </div>

        {/* Middle Navigation - Desktop */}
        <nav id="navbar-links" className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#properties-section" className="transition-colors hover:text-emerald-600">
            Imóveis Disponíveis
          </a>
          <a href="#integration-section" className="transition-colors hover:text-emerald-600">
            Como Funciona
          </a>
          <button 
            onClick={onShowApiDemo}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentação da API</span>
          </button>
        </nav>

        {/* Action Button */}
        <div id="navbar-actions" className="flex items-center gap-3">
          <button
            onClick={onShowApiDemo}
            className="group flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            <span>Ver Payload CRM</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600" />
          </button>
        </div>

      </div>
    </header>
  );
}
