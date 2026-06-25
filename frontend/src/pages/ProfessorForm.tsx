import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProfessor, useUpdateProfessor, useProfessores } from '../hooks/useProfessores';
import { useDepartamentos } from '../hooks/useDepartamentos';

export default function ProfessorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const create = useCreateProfessor();
  const update = useUpdateProfessor();
  const { data: professores } = useProfessores();
  const { data: departamentos } = useDepartamentos();
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');

  const listaDepartamentos = departamentos ? (Array.isArray(departamentos) ? departamentos : (departamentos as any).results || []) : [];
  const listaProfessores = professores ? (Array.isArray(professores) ? professores : (professores as any).results || []) : [];

  useEffect(() => {
    if (isEditing && listaProfessores.length > 0) {
      const prof = listaProfessores.find((p: any) => p.id === Number(id));
      if (prof) {
        setNome(prof.nome);
        setDepartamento(String(prof.departamento));
      }
    }
  }, [isEditing, id, listaProfessores]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = { nome, departamento: Number(departamento) };
    if (isEditing) {
      update.mutate({ id: Number(id), ...body }, { onSuccess: () => navigate('/professores') });
    } else {
      create.mutate(body, { onSuccess: () => navigate('/professores') });
    }
  };

  const mutation = isEditing ? update : create;
  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">{isEditing ? 'Editar' : 'Novo'} Professor</h2>
        <p className="text-slate-500 text-sm mt-1">{isEditing ? 'Atualize os dados do professor' : 'Cadastre um docente e relacione ao seu departamento'}</p>
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

        {mutation.isError && <p className="text-rose-600 text-sm font-medium">Erro ao salvar. Verifique os campos.</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/professores')} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={mutation.isPending} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-600/30">
            {mutation.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
