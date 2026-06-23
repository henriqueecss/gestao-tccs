import { Link } from 'react-router-dom';
import { useUnidades } from '../hooks/useUnidades';

export default function Unidades() {
  const { data: unidades, isLoading, error } = useUnidades();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Unidades Acadêmicas</h2>
        <Link to="/unidades/novo" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Nova Unidade</Link>
      </div>

      {isLoading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar unidades.</p>}

      {unidades && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sigla</th>
              </tr>
            </thead>
            <tbody>
              {unidades.map((unidade) => (
                <tr key={unidade.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{unidade.id}</td>
                  <td className="px-4 py-2 text-sm">{unidade.nome}</td>
                  <td className="px-4 py-2 text-sm">{unidade.sigla}</td>
                </tr>
              ))}
              {unidades.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
                    Nenhuma unidade encontrada.
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
