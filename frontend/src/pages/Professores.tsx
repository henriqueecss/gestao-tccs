import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfessores, useDeleteProfessor } from '../hooks/useProfessores';

export default function Professores() {
  const [search, setSearch] = useState('');
  const { data: professores, isLoading, error } = useProfessores(search || undefined);
  const deleteProfessor = useDeleteProfessor();

  const listaProfessores = professores ? (Array.isArray(professores) ? professores : (professores as any).results || []) : [];

  const handleDelete = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o professor "${nome}"?`)) {
      deleteProfessor.mutate(id);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Professores</h2>
          <p className="text-slate-500 text-sm mt-1">Gestão do corpo docente e orientadores</p>
        </div>
        <Link to="/professores/novo" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Novo Professor
        </Link>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Buscar professor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {isLoading && <div className="text-center py-8 text-slate-500">Carregando...</div>}
      {error && <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">Erro ao carregar professores.</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nome</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Departamento</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaProfessores.map((prof: any) => (
                  <tr key={prof.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">#{prof.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{prof.nome}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {prof.departamento}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/professores/${prof.id}/editar`} className="text-blue-500 hover:text-blue-700 font-medium text-sm">Editar</Link>
                      <button onClick={() => handleDelete(prof.id, prof.nome)} className="text-rose-500 hover:text-rose-700 font-medium text-sm">Excluir</button>
                    </td>
                  </tr>
                ))}
                {listaProfessores.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Nenhum professor encontrado.</td>
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
