import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useEstatisticas } from '../hooks/useTccs';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

function toChartData(record: Record<string, number>) {
  return Object.entries(record).map(([name, value]) => ({ name, value }));
}

export default function Dashboard() {
  const { data: stats, isLoading, error } = useEstatisticas();

  if (isLoading) return <p className="text-gray-500">Carregando...</p>;
  if (error) return <p className="text-red-600">Erro ao carregar estatísticas.</p>;
  if (!stats) return null;

  const statusData = toChartData(stats.por_status);
  const tipoData = toChartData(stats.por_tipo);
  const orientadorData = toChartData(stats.por_orientador);
  const cursoData = toChartData(stats.por_curso);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <p className="text-gray-500 mb-6">
        Total de TCCs: <span className="font-bold text-gray-900">{stats.total_geral}</span>
      </p>

      {stats.total_geral === 0 ? (
        <p className="text-gray-400">Cadastre TCCs para ver os gráficos.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Por Status">
            <PieChart width={400} height={300}>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartCard>

          <ChartCard title="Por Tipo">
            <PieChart width={400} height={300}>
              <Pie data={tipoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {tipoData.map((_, i) => (
                  <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartCard>

          <ChartCard title="Por Orientador">
            <BarChart width={400} height={300} data={orientadorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" name="TCCs" fill="#3b82f6" />
            </BarChart>
          </ChartCard>

          <ChartCard title="Por Curso">
            <BarChart width={400} height={300} data={cursoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" name="TCCs" fill="#10b981" />
            </BarChart>
          </ChartCard>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
