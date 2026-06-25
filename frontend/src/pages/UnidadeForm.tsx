import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUnidade } from '../hooks/useUnidades';

export default function UnidadeForm() {
  const navigate = useNavigate();
  const create = useCreateUnidade();
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate({ nome, sigla }, { onSuccess: () => navigate('/unidades') });
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Nova Unidade Acadêmica</h2>
        <p className="text-slate-500 text-sm mt-1">Cadastre uma nova unidade acadêmica</p>
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

        {create.isError && <p className="text-rose-600 text-sm font-medium">Erro ao salvar. Verifique os campos.</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/unidades')} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
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