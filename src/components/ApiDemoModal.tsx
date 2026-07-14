import React, { useState } from 'react';
import { X, Code, Terminal, Play, BookOpen, Layers, Send, CheckCircle2, Copy } from 'lucide-react';
import { formatPrice } from '../types';

interface ApiDemoModalProps {
  onClose: () => void;
}

export default function ApiDemoModal({ onClose }: ApiDemoModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  const fetchSnippet = `// Exemplo de código Frontend (JS/TS) para enviar o Lead ao CRM SisteNext

async function enviarLeadParaSisteNext(leadData) {
  const payload = {
    nome: leadData.nome,
    telefone: leadData.telefone,
    email: leadData.email,
    origem: "Site Imobiliária",
    empresaId: "SUA_EMPRESA_ID",
    dados: {
      imovelId: leadData.imovelId,
      titulo: leadData.imovelTitulo,
      valor: leadData.imovelValor
    }
  };

  try {
    const response = await fetch('https://sistenext.vercel.app/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicione cabeçalhos de autenticação do SisteNext se necessário:
        // 'Authorization': 'Bearer SEU_TOKEN_AQUI'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("Lead registrado com sucesso no CRM SisteNext!");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Falha ao comunicar com SisteNext CRM:", error);
    return false;
  }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(fetchSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTestCall = () => {
    setTestLoading(true);
    setTestSuccess(false);
    setTimeout(() => {
      setTestLoading(false);
      setTestSuccess(true);
    }, 1000);
  };

  return (
    <div id="api-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-300">
      <div 
        id="api-modal-container"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Code className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-sans text-base font-bold text-slate-900">
                Integração API SisteNext CRM
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Especificações de integração do modelo frontend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Top description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Conexão Direta e Limpa
            </h4>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              O objetivo deste site modelo é demonstrar a simplicidade de conectar um frontend imobiliário de alta performance ao seu CRM proprietário. O site não armazena dados em bancos próprios nem necessita de Firebase ou qualquer outro backend complexo. Ele faz requisições diretas à API de recepção de Leads.
            </p>
          </div>

          {/* Code Snippet Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Exemplo de Implementação (Fetch API)
              </h4>
              <button
                onClick={copyCode}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                {copiedCode ? 'Copiado!' : 'Copiar Código'}
              </button>
            </div>
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 overflow-hidden shadow-inner">
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[220px]">
                {fetchSnippet}
              </pre>
            </div>
          </div>

          {/* Live sandbox test simulated */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Simulação de Endpoint de Testes
                </h4>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Teste o despacho simulado de uma carga de lead padrão e verifique o retorno.
                </p>
              </div>
              <button
                onClick={handleTestCall}
                disabled={testLoading}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all disabled:opacity-50"
              >
                {testLoading ? (
                  <>
                    <svg className="h-3 w-3 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Disparando...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 fill-current" />
                    <span>Testar Envio</span>
                  </>
                )}
              </button>
            </div>

            {testSuccess && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3.5 flex gap-3 text-xs text-emerald-800 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950 block">Status 200 OK — Sucesso SisteNext</span>
                  O payload foi processado de forma fictícia com absoluto êxito. O CRM SisteNext identificou um novo lead com origem <code className="font-mono bg-emerald-100 text-emerald-900 px-1 rounded">"Site Imobiliária"</code> e mapeou o respectivo interesse.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50">
          <button
            onClick={onClose}
            className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
