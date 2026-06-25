import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTccs, useUpdateTccStatus, useDeleteTcc } from '../hooks/useTccs';
import type { StatusTcc } from '../types';

const STATUS_OPTIONS: { value: StatusTcc; label: string }[] = [
  { value: '0', label: 'Em Elaboração' },
  { value: '1', label: 'Enviado' },
  { value: '2', label: 'Aprovado' },
  { value: '3', label: 'Reprovado' },
];

const STATUS_COLORS: Record<StatusTcc, string> = {
  '0': 'bg-amber-100 text-amber-800',
  '1': 'bg-blue-100 text-blue-800',
  '2': 'bg-emerald-100 text-emerald-800',
  '3': 'bg-rose-100 text-rose-800',
};

export default function TccList() {
  const [search, setSearch] = useState('');
  const { data: tccs, isLoading, error } = useTccs(search || undefined);
  const updateStatus = useUpdateTccStatus();
  const deleteTcc = useDeleteTcc();

  const handleStatusChange = (id: number, status: string) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = (id: number, titulo: string) => {
    if (confirm(`Tem certeza que deseja excluir o TCC "${titulo}"?`)) {
      deleteTcc.mutate(id);
    }
  };

  const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/api\/?$/, '');

  // CORREÇÃO: Lida com a paginação do Django REST Framework ou dados vazios
const listaTccs = tccs ? (Array.isArray(tccs) ? tccs : (tccs as any).results || []) : [];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Trabalhos de Conclusão</h2>
          <p className="text-slate-500 text-sm mt-1">Gerencie os TCCs cadastrados no sistema</p>
        </div>
        <Link to="/tccs/novo" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Novo TCC
        </Link>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Buscar por título ou resumo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {isLoading && <div className="text-center py-8 text-slate-500">Carregando...</div>}
      {error && <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">Erro ao carregar a lista de TCCs.</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Título do Trabalho</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tipo</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Arquivo</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaTccs.map((tcc: any) => (
                  <tr key={tcc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{tcc.titulo}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">{tcc.tipo_display}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={tcc.status}
                        onChange={(e) => handleStatusChange(tcc.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer outline-none ${STATUS_COLORS[tcc.status as StatusTcc]}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {tcc.arquivo ? (
                        <a href={tcc.arquivo.startsWith('http') ? tcc.arquivo : `${apiBase}${tcc.arquivo}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Ver PDF</a>
                      ) : (
                        <span className="text-slate-400">Pendente</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(tcc.id, tcc.titulo)} className="text-rose-500 hover:text-rose-700 font-medium text-sm">Excluir</button>
                    </td>
                  </tr>
                ))}
                {listaTccs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Nenhum TCC encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}