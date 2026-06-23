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
  '0': 'bg-yellow-100 text-yellow-800',
  '1': 'bg-blue-100 text-blue-800',
  '2': 'bg-green-100 text-green-800',
  '3': 'bg-red-100 text-red-800',
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
    if (confirm(`Excluir o TCC "${titulo}"?`)) {
      deleteTcc.mutate(id);
    }
  };

  const apiBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">TCCs</h2>
        <Link
          to="/tccs/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          + Novo TCC
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por título ou resumo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar TCCs.</p>}

      {tccs && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Título</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tipo</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Arquivo</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tccs.map((tcc) => (
                <tr key={tcc.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">
                    <div className="font-medium">{tcc.titulo}</div>
                  </td>
                  <td className="px-4 py-2 text-sm">{tcc.tipo_display}</td>
                  <td className="px-4 py-2 text-sm">
                    <select
                      value={tcc.status}
                      onChange={(e) => handleStatusChange(tcc.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[tcc.status]}`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {tcc.arquivo ? (
                      <a
                        href={`${apiBase}${tcc.arquivo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Ver PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">Sem arquivo</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDelete(tcc.id, tcc.titulo)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {tccs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                    Nenhum TCC encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
