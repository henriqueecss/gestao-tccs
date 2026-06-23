import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCurso } from '../hooks/useCursos';

export default function CursoForm() {
  const navigate = useNavigate();
  const create = useCreateCurso();
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate({ nome, sigla, codigo }, { onSuccess: () => navigate('/cursos') });
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-6">Novo Curso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sigla *</label>
          <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required className={inputClass} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={create.isPending} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
            {create.isPending ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => navigate('/cursos')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Cancelar
          </button>
        </div>
        {create.isError && <p className="text-red-600 text-sm">Erro ao salvar. Verifique os campos.</p>}
      </form>
    </div>
  );
}
