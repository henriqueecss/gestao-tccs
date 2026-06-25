import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTcc } from '../hooks/useTccs';
import { useAlunos } from '../hooks/useAlunos';
import { useProfessores } from '../hooks/useProfessores';
import { TIPO_TCC_OPTIONS, IDIOMA_OPTIONS, SEMESTRE_OPTIONS } from '../types';

export default function TccForm() {
  const navigate = useNavigate();
  const createTcc = useCreateTcc();
  const { data: alunos } = useAlunos();
  const { data: professores } = useProfessores();

  // Trava de segurança para paginação nos selects
  const listaAlunos = alunos ? (Array.isArray(alunos) ? alunos : (alunos as any).results || []) : [];
  const listaProfessores = professores ? (Array.isArray(professores) ? professores : (professores as any).results || []) : [];

  const [form, setForm] = useState({
    titulo: '',
    resumo: '',
    palavras_chave: '',
    tipo: 'MONOGRAFIA',
    idioma: 'PT',
    aluno: '',
    orientador: '',
    coorientador: '',
    presidente: '',
    primeiro_membro: '',
    segundo_membro: '',
    semestre_letivo_defesa: '',
    status: '0',
  });
  const [arquivo, setArquivo] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (arquivo) {
      const maxLen = 95;
      let file = arquivo;
      if (arquivo.name.length > maxLen) {
        const ext = arquivo.name.slice(arquivo.name.lastIndexOf('.'));
        const truncatedName = arquivo.name.slice(0, maxLen - ext.length) + ext;
        file = new File([arquivo], truncatedName, { type: arquivo.type });
      }
      formData.append('arquivo', file);
    }
    createTcc.mutate(formData, { onSuccess: () => navigate('/tccs') });
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Cadastrar Novo TCC</h2>
        <p className="text-slate-500 text-sm mt-1">Preencha os dados do trabalho de conclusão e da banca avaliadora</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Informações Gerais</h3>
          <div>
            <label className={labelClass}>Título do Trabalho *</label>
            <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Resumo *</label>
            <textarea name="resumo" value={form.resumo} onChange={handleChange} required rows={4} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Palavras-chave *</label>
            <input type="text" name="palavras_chave" value={form.palavras_chave} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tipo *</label>
              <select name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
                {TIPO_TCC_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Idioma *</label>
              <select name="idioma" value={form.idioma} onChange={handleChange} className={inputClass}>
                {IDIOMA_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Autoria e Banca</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Aluno *</label>
              <select name="aluno" value={form.aluno} onChange={handleChange} required className={inputClass}>
                <option value="">Selecione...</option>
                {listaAlunos.map((a: any) => <option key={a.id} value={a.id}>{a.nome} ({a.matricula})</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Orientador *</label>
              <select name="orientador" value={form.orientador} onChange={handleChange} required className={inputClass}>
                <option value="">Selecione...</option>
                {listaProfessores.map((p: any) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Coorientador</label>
              <select name="coorientador" value={form.coorientador} onChange={handleChange} className={inputClass}>
                <option value="">Nenhum</option>
                {listaProfessores.map((p: any) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Presidente da Banca *</label>
              <select name="presidente" value={form.presidente} onChange={handleChange} required className={inputClass}>
                <option value="">Selecione...</option>
                {listaProfessores.map((p: any) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>1º Membro da Banca *</label>
              <select name="primeiro_membro" value={form.primeiro_membro} onChange={handleChange} required className={inputClass}>
                <option value="">Selecione...</option>
                {listaProfessores.map((p: any) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>2º Membro da Banca *</label>
              <select name="segundo_membro" value={form.segundo_membro} onChange={handleChange} required className={inputClass}>
                <option value="">Selecione...</option>
                {listaProfessores.map((p: any) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Arquivo e Defesa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Semestre Letivo da Defesa</label>
              <select name="semestre_letivo_defesa" value={form.semestre_letivo_defesa} onChange={handleChange} className={inputClass}>
                <option value="">Nenhum</option>
                {SEMESTRE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Arquivo PDF</label>
              <input type="file" accept=".pdf" onChange={(e) => setArquivo(e.target.files?.[0] ?? null)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>
          </div>
        </div>

        {createTcc.isError && <p className="text-rose-600 text-sm font-medium">Erro ao salvar o TCC. Verifique os campos.</p>}

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <button type="button" onClick={() => navigate('/tccs')} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={createTcc.isPending} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm shadow-blue-600/30">
            {createTcc.isPending ? 'Salvando...' : 'Salvar TCC'}
          </button>
        </div>
      </form>
    </div>
  );
}