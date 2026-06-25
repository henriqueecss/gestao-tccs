import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlunos, useDeleteAluno } from '../hooks/useAlunos';

export default function Alunos() {
  const [search, setSearch] = useState('');
  const { data: alunos, isLoading, error } = useAlunos(search || undefined);
  const deleteAluno = useDeleteAluno();

  const listaAlunos = alunos ? (Array.isArray(alunos) ? alunos : (alunos as any).results || []) : [];

  const handleDelete = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o aluno "${nome}"?`)) {
      deleteAluno.mutate(id);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Alunos</h2>
          <p className="text-slate-500 text-sm mt-1">Gestão de alunos matriculados</p>
        </div>
        <Link to="/alunos/novo" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Novo Aluno
        </Link>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Buscar aluno por nome ou matrícula..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {isLoading && <div className="text-center py-8 text-slate-500">Carregando...</div>}
      {error && <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">Erro ao carregar alunos.</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nome</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Matrícula</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Curso</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaAlunos.map((aluno: any) => (
                  <tr key={aluno.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">#{aluno.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{aluno.nome}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{aluno.matricula}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{aluno.curso}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/alunos/${aluno.id}/editar`} className="text-blue-500 hover:text-blue-700 font-medium text-sm">Editar</Link>
                      <button onClick={() => handleDelete(aluno.id, aluno.nome)} className="text-rose-500 hover:text-rose-700 font-medium text-sm">Excluir</button>
                    </td>
                  </tr>
                ))}
                {listaAlunos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Nenhum aluno encontrado.</td>
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
