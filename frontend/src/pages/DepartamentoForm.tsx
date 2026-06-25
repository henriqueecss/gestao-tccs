import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateDepartamento, useUpdateDepartamento, useDepartamentos } from '../hooks/useDepartamentos';
import { useUnidades } from '../hooks/useUnidades';

export default function DepartamentoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const create = useCreateDepartamento();
  const update = useUpdateDepartamento();
  const { data: departamentos } = useDepartamentos();
  const { data: unidades } = useUnidades();
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [unidadeAcademica, setUnidadeAcademica] = useState('');

  const listaUnidades = unidades ? (Array.isArray(unidades) ? unidades : (unidades as any).results || []) : [];
  const listaDepartamentos = departamentos ? (Array.isArray(departamentos) ? departamentos : (departamentos as any).results || []) : [];

  useEffect(() => {
    if (isEditing && listaDepartamentos.length > 0) {
      const dep = listaDepartamentos.find((d: any) => d.id === Number(id));
      if (dep) {
        setNome(dep.nome);
        setSigla(dep.sigla);
        setUnidadeAcademica(String(dep.unidade_academica));
      }
    }
  }, [isEditing, id, listaDepartamentos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = { nome, sigla, unidade_academica: Number(unidadeAcademica) };
    if (isEditing) {
      update.mutate({ id: Number(id), ...body }, { onSuccess: () => navigate('/departamentos') });
    } else {
      create.mutate(body, { onSuccess: () => navigate('/departamentos') });
    }
  };

  const mutation = isEditing ? update : create;
  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">{isEditing ? 'Editar' : 'Novo'} Departamento</h2>
        <p className="text-slate-500 text-sm mt-1">{isEditing ? 'Atualize os dados do departamento' : 'Cadastre um novo departamento e vincule-o a uma unidade'}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div>
          <label className={labelClass}>Nome *</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sigla *</label>
          <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Unidade Acadêmica *</label>
          <select value={unidadeAcademica} onChange={(e) => setUnidadeAcademica(e.target.value)} required className={inputClass}>
            <option value="">Selecione...</option>
            {listaUnidades.map((u: any) => (
              <option key={u.id} value={u.id}>{u.nome} ({u.sigla})</option>
            ))}
          </select>
        </div>

        {mutation.isError && <p className="text-rose-600 text-sm font-medium">Erro ao salvar. Verifique os campos.</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/departamentos')} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
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
