import { Link } from 'react-router-dom';
import { useDepartamentos } from '../hooks/useDepartamentos';

export default function Departamentos() {
  const { data: departamentos, isLoading, error } = useDepartamentos();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Departamentos</h2>
        <Link to="/departamentos/novo" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Novo Departamento</Link>
      </div>

      {isLoading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar departamentos.</p>}

      {departamentos && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sigla</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unidade Acadêmica</th>
              </tr>
            </thead>
            <tbody>
              {departamentos.map((dep) => (
                <tr key={dep.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{dep.id}</td>
                  <td className="px-4 py-2 text-sm">{dep.nome}</td>
                  <td className="px-4 py-2 text-sm">{dep.sigla}</td>
                  <td className="px-4 py-2 text-sm">{dep.unidade_academica}</td>
                </tr>
              ))}
              {departamentos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    Nenhum departamento encontrado.
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
