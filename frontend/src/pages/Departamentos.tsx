import { Link } from 'react-router-dom';
import { useDepartamentos } from '../hooks/useDepartamentos';

export default function Departamentos() {
  const { data: departamentos, isLoading, error } = useDepartamentos();

  // Trava de segurança para paginação
  const listaDepartamentos = departamentos ? (Array.isArray(departamentos) ? departamentos : (departamentos as any).results || []) : [];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Departamentos</h2>
          <p className="text-slate-500 text-sm mt-1">Gestão de departamentos da instituição</p>
        </div>
        <Link to="/departamentos/novo" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Novo Departamento
        </Link>
      </div>

      {isLoading && <div className="text-center py-8 text-slate-500">Carregando...</div>}
      {error && <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">Erro ao carregar departamentos.</div>}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nome</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sigla</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Unidade Acadêmica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaDepartamentos.map((dep: any) => (
                  <tr key={dep.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">#{dep.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{dep.nome}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{dep.sigla}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {dep.unidade_academica}
                      </span>
                    </td>
                  </tr>
                ))}
                {listaDepartamentos.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Nenhum departamento encontrado.</td>
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