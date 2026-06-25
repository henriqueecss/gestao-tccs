import { Link } from 'react-router-dom';
import { useUnidades, useDeleteUnidade } from '../hooks/useUnidades';

export default function Unidades() {
  const { data: unidades, isLoading, error } = useUnidades();
  const deleteUnidade = useDeleteUnidade();

  const listaUnidades = unidades ? (Array.isArray(unidades) ? unidades : (unidades as any).results || []) : [];

  const handleDelete = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir a unidade "${nome}"?`)) {
      deleteUnidade.mutate(id);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Unidades Acadêmicas</h2>
          <p className="text-slate-500 text-sm mt-1">Gestão das unidades e institutos</p>
        </div>
        <Link to="/unidades/novo" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Nova Unidade
        </Link>
      </div>

      {isLoading && <div className="text-center py-8 text-slate-500">Carregando...</div>}
      {error && <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">Erro ao carregar unidades.</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nome</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sigla</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaUnidades.map((unidade: any) => (
                  <tr key={unidade.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">#{unidade.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{unidade.nome}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{unidade.sigla}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/unidades/${unidade.id}/editar`} className="text-blue-500 hover:text-blue-700 font-medium text-sm">Editar</Link>
                      <button onClick={() => handleDelete(unidade.id, unidade.nome)} className="text-rose-500 hover:text-rose-700 font-medium text-sm">Excluir</button>
                    </td>
                  </tr>
                ))}
                {listaUnidades.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Nenhuma unidade encontrada.</td>
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
