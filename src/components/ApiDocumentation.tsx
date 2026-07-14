import React, { useState } from 'react';
import { Terminal, Code, Cpu, Database, Send, CheckCircle2, Copy, FileText, Globe } from 'lucide-react';

export default function ApiDocumentation() {
  const [copied, setCopied] = useState(false);

  const rawSchema = `{
  "nome": "João Silva",
  "telefone": "(11) 99999-9999",
  "email": "joao.silva@email.com",
  "origem": "Site Imobiliária",
  "empresaId": "ID_DA_EMPRESA",
  "imovel": {
    "id": "prop-1",
    "titulo": "Cobertura Duplex Jardins",
    "valor": "R$ 4.200.000"
  }
}`;

  const copySchema = () => {
    navigator.clipboard.writeText(rawSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="integration-section" className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Guia de Integração
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Como funciona a integração com o SisteNext
          </h2>
          <p className="mt-4 text-base text-slate-500 font-light leading-relaxed">
            Este site é um frontend desacoplado. Toda a lógica de armazenamento, pipeline de vendas e funis de atendimento ocorrem dentro do próprio CRM SisteNext.
          </p>
        </div>

        {/* 3 Step Explanation Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              1. Ação do Usuário (Frontend)
            </h3>
            <p className="mt-2 text-sm text-slate-500 font-light leading-relaxed">
              O cliente navega pelo catálogo imobiliário, escolhe um imóvel e clica no botão <span className="font-semibold text-slate-700">"Tenho Interesse"</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              2. Disparo do Payload JSON
            </h3>
            <p className="mt-2 text-sm text-slate-500 font-light leading-relaxed">
              O formulário coleta os dados pessoais e anexa os detalhes do imóvel de interesse, enviando uma requisição HTTP <span className="font-mono text-xs font-bold text-slate-800">POST</span> direta para a API.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              3. Captura Automática no CRM
            </h3>
            <p className="mt-2 text-sm text-slate-500 font-light leading-relaxed">
              A API do CRM SisteNext valida o payload, cadastra o lead, associa-o ao imóvel correspondente e notifica os corretores responsáveis.
            </p>
          </div>

        </div>

        {/* Technical Showcase Split */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 items-center">
          
          {/* Documentation Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Especificação Técnica do Lead
            </h3>
            
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Para integrar esta ou qualquer outra página ao CRM SisteNext, basta realizar uma requisição segura contendo o cabeçalho <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded text-emerald-700">Content-Type: application/json</code> e o corpo estruturado ao lado.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Origem Rastreável</h4>
                  <p className="text-xs text-slate-500">O campo <span className="font-mono">origem</span> permite mapear exatamente de qual landing page ou hotsite o lead foi originado.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Vínculo de Imóvel</h4>
                  <p className="text-xs text-slate-500">Ao enviar as chaves do imóvel de interesse (<span className="font-mono">id, titulo, valor</span>), o CRM associa o lead automaticamente ao imóvel correspondente.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Sem Backend Requerido</h4>
                  <p className="text-xs text-slate-500">Desenvolvido como Single Page Application estática, permitindo performance e facilidade de deploy sem servidores adicionais.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Code block Display */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 shadow-xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between bg-slate-900 px-5 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs font-semibold text-slate-300">
                  HTTP Payload Schema (SisteNext CRM)
                </span>
              </div>
              <button 
                onClick={copySchema}
                className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800"
              >
                {copied ? (
                  <span className="text-emerald-400 font-bold">Copiado!</span>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar Schema</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-slate-300 leading-relaxed">
                <span className="text-emerald-400">POST</span> <span className="text-slate-400">https://sistenext.vercel.app/api/leads</span>
                <br />
                <span className="text-slate-500">Content-Type: application/json</span>
                <br />
                <br />
                {rawSchema}
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
