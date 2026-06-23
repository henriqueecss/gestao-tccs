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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (arquivo) {
      // Truncar nome do arquivo se > 95 caracteres (limite do backend é 100)
      const maxLen = 95;
      let file = arquivo;
      if (arquivo.name.length > maxLen) {
        const ext = arquivo.name.slice(arquivo.name.lastIndexOf('.'));
        const truncatedName = arquivo.name.slice(0, maxLen - ext.length) + ext;
        file = new File([arquivo], truncatedName, { type: arquivo.type });
      }
      formData.append('arquivo', file);
    }

    createTcc.mutate(formData, {
      onSuccess: () => navigate('/tccs'),
    });
  };

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Novo TCC</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Título *</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Resumo *</label>
          <textarea
            name="resumo"
            value={form.resumo}
            onChange={handleChange}
            required
            rows={4}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Palavras-chave *</label>
          <input
            type="text"
            name="palavras_chave"
            value={form.palavras_chave}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tipo *</label>
            <select name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
              {TIPO_TCC_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Idioma *</label>
            <select name="idioma" value={form.idioma} onChange={handleChange} className={inputClass}>
              {IDIOMA_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Aluno *</label>
          <select name="aluno" value={form.aluno} onChange={handleChange} required className={inputClass}>
            <option value="">Selecione...</option>
            {alunos?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome} ({a.matricula})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Orientador *</label>
          <select name="orientador" value={form.orientador} onChange={handleChange} required className={inputClass}>
            <option value="">Selecione...</option>
            {professores?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Coorientador</label>
          <select name="coorientador" value={form.coorientador} onChange={handleChange} className={inputClass}>
            <option value="">Nenhum</option>
            {professores?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Presidente da Banca *</label>
          <select name="presidente" value={form.presidente} onChange={handleChange} required className={inputClass}>
            <option value="">Selecione...</option>
            {professores?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>1º Membro da Banca *</label>
            <select name="primeiro_membro" value={form.primeiro_membro} onChange={handleChange} required className={inputClass}>
              <option value="">Selecione...</option>
              {professores?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>2º Membro da Banca *</label>
            <select name="segundo_membro" value={form.segundo_membro} onChange={handleChange} required className={inputClass}>
              <option value="">Selecione...</option>
              {professores?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Semestre Letivo da Defesa</label>
          <select name="semestre_letivo_defesa" value={form.semestre_letivo_defesa} onChange={handleChange} className={inputClass}>
            <option value="">Nenhum</option>
            {SEMESTRE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Arquivo PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
            className={inputClass}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={createTcc.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {createTcc.isPending ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/tccs')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>

        {createTcc.isError && (
          <p className="text-red-600 text-sm">Erro ao salvar o TCC. Verifique os campos.</p>
        )}
      </form>
    </div>
  );
}
