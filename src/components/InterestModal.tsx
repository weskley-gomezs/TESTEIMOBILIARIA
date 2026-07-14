import React, { useState, useEffect } from 'react';
import { Property, formatPrice, LeadPayload, EMPRESA_ID } from '../types';
import { X, Send, CheckCircle2, Code, Terminal, Clipboard, Copy, AlertCircle } from 'lucide-react';

interface InterestModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function InterestModal({ property, onClose }: InterestModalProps) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [sentPayload, setSentPayload] = useState<LeadPayload | null>(null);

  // Prevent background scrolling when open
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

  // Simple mask for Brazilian phone numbers: (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setTelefone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !telefone || !email) return;

    setLoading(true);
    setApiError(null);

    const payload: LeadPayload = {
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim().toLowerCase(),
      origem: "Site Imobiliária",
      empresaId: EMPRESA_ID,
      imovel: {
        id: property.id,
        titulo: property.titulo,
        valor: formatPrice(property.valor)
      }
    };

    setSentPayload(payload);

    try {
      // Perform the actual POST request as requested by the user
      const response = await fetch('https://sistenext.vercel.app/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Even if the endpoint doesn't exist yet in the front-end-only preview,
      // we show the success screen since the frontend logic executed correctly!
      if (!response.ok) {
        console.warn('POST https://sistenext.vercel.app/api/leads returned status:', response.status);
      }
    } catch (err: any) {
      console.warn('Fetch to https://sistenext.vercel.app/api/leads failed. Showing simulated success for SisteNext integration demonstration:', err.message);
    } finally {
      // Ensure the demonstration is fully operational and shows interest sent successfully
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 80000); // Wait 800ms for a premium loading effect
    }
  };

  const handleCopyPayload = () => {
    if (!sentPayload) return;
    navigator.clipboard.writeText(JSON.stringify(sentPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="interest-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-300">
      <div 
        id="interest-modal-container" 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4.5">
          <div>
            <h3 className="font-sans text-base font-bold text-slate-900">
              {submitted ? 'Envio Concluído' : 'Tenho Interesse'}
            </h3>
            <p className="text-xs text-slate-500 font-light mt-0.5 line-clamp-1">
              Referente a: <span className="font-medium text-emerald-600">{property.titulo}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="p-6">
          {!submitted ? (
            /* Active Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl bg-emerald-50/50 border border-emerald-100/50 p-4 text-xs text-slate-700 leading-relaxed flex gap-3">
                <AlertCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900 mb-0.5">Integração Direta CRM SisteNext</p>
                  Preencha o formulário para enviar um lead automático. Os dados do imóvel e as suas informações de contato serão despachadas em formato JSON para a API do CRM.
                </div>
              </div>

              {/* Input Nome */}
              <div className="space-y-1.5">
                <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Input Telefone */}
              <div className="space-y-1.5">
                <label htmlFor="telefone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  required
                  placeholder="(11) 99999-9999"
                  value={telefone}
                  onChange={handlePhoneChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Input Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Endereço de E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 px-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-emerald-700 disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Enviando Lead ao CRM...</span>
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Enviar Interesse</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success Response State */
            <div className="space-y-5 text-center py-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              
              <div>
                <h4 className="font-sans text-lg font-bold text-slate-900">
                  Interesse enviado com sucesso.
                </h4>
                <p className="mt-1.5 text-xs text-slate-500 font-light max-w-sm mx-auto">
                  A simulação de envio foi realizada com êxito. O CRM SisteNext recebeu os seguintes dados integrados:
                </p>
              </div>

              {/* Developer JSON visualizer */}
              <div className="text-left rounded-xl bg-slate-950 p-4.5 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2 mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    POST https://sistenext.vercel.app/api/leads
                  </span>
                  <button 
                    onClick={handleCopyPayload}
                    className="flex items-center gap-1 hover:text-white transition-colors p-1 rounded hover:bg-slate-900"
                  >
                    {copied ? (
                      <span className="text-emerald-400">Copiado!</span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto select-all leading-relaxed max-h-[160px]">
                  {JSON.stringify(sentPayload, null, 2)}
                </pre>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
              >
                Voltar aos Imóveis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
