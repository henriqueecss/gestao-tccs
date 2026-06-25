import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProfessor } from '../hooks/useProfessores';
import { useDepartamentos } from '../hooks/useDepartamentos';

export default function ProfessorForm() {
  const navigate = useNavigate();
  const create = useCreateProfessor();
  const { data: departamentos } = useDepartamentos();
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');

  // Trava de segurança para paginação nos selects
  const listaDepartamentos = departamentos ? (Array.isArray(departamentos) ? departamentos : (departamentos as any).results || []) : [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate(
      { nome, departamento: Number(departamento) },
      { onSuccess: () => navigate('/professores') },
    );
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Novo Professor</h2>
        <p className="text-slate-500 text-sm mt-1">Cadastre um docente e relacione ao seu departamento</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div>
          <label className={labelClass}>Nome *</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Departamento *</label>
          <select value={departamento} onChange={(e) => setDepartamento(e.target.value)} required className={inputClass}>
            <option value="">Selecione...</option>
            {listaDepartamentos.map((d: any) => (
              <option key={d.id} value={d.id}>{d.nome} ({d.sigla})</option>
            ))}
          </select>
        </div>

        {create.isError && <p className="text-rose-600 text-sm font-medium">Erro ao salvar. Verifique os campos.</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/professores')} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={create.isPending} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-600/30">
            {create.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}