import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlunos } from '../hooks/useAlunos';

export default function Alunos() {
  const [search, setSearch] = useState('');
  const { data: alunos, isLoading, error } = useAlunos(search || undefined);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Alunos</h2>
        <Link to="/alunos/novo" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Novo Aluno</Link>
      </div>

      <input
        type="text"
        placeholder="Buscar aluno..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar alunos.</p>}

      {alunos && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Matrícula</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Curso</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{aluno.id}</td>
                  <td className="px-4 py-2 text-sm">{aluno.nome}</td>
                  <td className="px-4 py-2 text-sm">{aluno.matricula}</td>
                  <td className="px-4 py-2 text-sm">{aluno.curso}</td>
                </tr>
              ))}
              {alunos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    Nenhum aluno encontrado.
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
