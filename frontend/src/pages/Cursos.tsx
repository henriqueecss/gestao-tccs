import { Link } from 'react-router-dom';
import { useCursos, useDeleteCurso } from '../hooks/useCursos';

export default function Cursos() {
  const { data: cursos, isLoading, error } = useCursos();
  const deleteCurso = useDeleteCurso();

  const listaCursos = cursos ? (Array.isArray(cursos) ? cursos : (cursos as any).results || []) : [];

  const handleDelete = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o curso "${nome}"?`)) {
      deleteCurso.mutate(id);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Cursos</h2>
          <p className="text-slate-500 text-sm mt-1">Gestão de cursos da instituição</p>
        </div>
        <Link to="/cursos/novo" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Novo Curso
        </Link>
      </div>

      {isLoading && <div className="text-center py-8 text-slate-500">Carregando...</div>}
      {error && <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">Erro ao carregar cursos.</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nome</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sigla</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Código</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaCursos.map((curso: any) => (
                  <tr key={curso.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">#{curso.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{curso.nome}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{curso.sigla}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{curso.codigo}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/cursos/${curso.id}/editar`} className="text-blue-500 hover:text-blue-700 font-medium text-sm">Editar</Link>
                      <button onClick={() => handleDelete(curso.id, curso.nome)} className="text-rose-500 hover:text-rose-700 font-medium text-sm">Excluir</button>
                    </td>
                  </tr>
                ))}
                {listaCursos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Nenhum curso encontrado.</td>
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
