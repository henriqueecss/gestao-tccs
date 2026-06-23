import { Link } from 'react-router-dom';
import { useCursos } from '../hooks/useCursos';

export default function Cursos() {
  const { data: cursos, isLoading, error } = useCursos();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Cursos</h2>
        <Link to="/cursos/novo" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Novo Curso</Link>
      </div>

      {isLoading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar cursos.</p>}

      {cursos && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sigla</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Código</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{curso.id}</td>
                  <td className="px-4 py-2 text-sm">{curso.nome}</td>
                  <td className="px-4 py-2 text-sm">{curso.sigla}</td>
                  <td className="px-4 py-2 text-sm">{curso.codigo}</td>
                </tr>
              ))}
              {cursos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    Nenhum curso encontrado.
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
