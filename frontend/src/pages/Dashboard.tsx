import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useEstatisticas } from '../hooks/useTccs';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

// CORREÇÃO APLICADA: Trava de segurança para dados indefinidos (banco vazio)
function toChartData(record?: Record<string, number> | null) {
  if (!record) return [];
  return Object.entries(record).map(([name, value]) => ({ name, value }));
}

export default function Dashboard() {
  const { data: stats, isLoading, error } = useEstatisticas();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
    </div>
  );
  if (error) return <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg shadow-sm">Erro ao carregar estatísticas do backend.</div>;
  if (!stats) return null;

  const statusData = toChartData(stats.por_status);
  const tipoData = toChartData(stats.por_tipo);
  const orientadorData = toChartData(stats.por_orientador);
  const cursoData = toChartData(stats.por_curso);

  const isEmpty = !stats.total_geral || stats.total_geral === 0;

  return (
    <div className="animate-fade-in">
      {/* Cabeçalho do Dashboard */}
      <div className="mb-8 flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
              <h2 className="text-3xl font-bold text-slate-800">Visão Geral</h2>
              <p className="text-slate-500 mt-1">Estatísticas do sistema de gestão acadêmica</p>
          </div>
          <div className="text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Registrado</span>
              <p className="text-4xl font-black text-blue-600 leading-none mt-1">{stats.total_geral || 0}</p>
          </div>
      </div>

      {isEmpty ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
            <span className="text-6xl mb-4 block">📭</span>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">Nenhum TCC cadastrado</h3>
            <p className="text-slate-500 max-w-md mx-auto">
                Seu banco de dados está vazio. Utilize o menu lateral para cadastrar unidades, cursos, alunos e professores para começar a visualizar os gráficos.
            </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChartCard title="Distribuição por Status">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Distribuição por Tipo">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={tipoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {tipoData.map((_, i) => (
                      <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="TCCs por Orientador">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orientadorData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" name="Quantidade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="TCCs por Curso">
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cursoData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" name="Quantidade" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-bold text-slate-700 mb-6 border-b border-slate-100 pb-3">{title}</h3>
      {children}
    </div>
  );
}