export interface UnidadeAcademica {
  id: number;
  nome: string;
  sigla: string;
}

export interface Departamento {
  id: number;
  nome: string;
  sigla: string;
  unidade_academica: number;
}

export interface Curso {
  id: number;
  nome: string;
  sigla: string;
  codigo: string;
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  curso: number;
}

export interface Professor {
  id: number;
  nome: string;
  departamento: number;
}

// Status vem como string "0","1","2","3" do backend
export const StatusTcc = {
  EM_ELABORACAO: '0',
  ENVIADO: '1',
  APROVADO: '2',
  REPROVADO: '3',
} as const;

export type StatusTcc = (typeof StatusTcc)[keyof typeof StatusTcc];

export const STATUS_LABELS: Record<StatusTcc, string> = {
  [StatusTcc.EM_ELABORACAO]: 'Em Elaboração',
  [StatusTcc.ENVIADO]: 'Enviado',
  [StatusTcc.APROVADO]: 'Aprovado',
  [StatusTcc.REPROVADO]: 'Reprovado',
};

export const TIPO_TCC_OPTIONS = [
  { value: 'MONOGRAFIA', label: 'Monografia' },
  { value: 'RELATORIO_ESTAGIO', label: 'Relatório de Estágio' },
  { value: 'RELATORIO_TECNICO', label: 'Relatório Técnico' },
  { value: 'ARTIGO', label: 'Artigo' },
] as const;

export const IDIOMA_OPTIONS = [
  { value: 'PT', label: 'Português' },
  { value: 'EN', label: 'Inglês' },
] as const;

export const SEMESTRE_OPTIONS = [
  '2020/1', '2020/2',
  '2021/1', '2021/2',
  '2022/1', '2022/2',
  '2023/1', '2023/2',
  '2024/1', '2024/2',
  '2025/1', '2025/2',
  '2026/1',
] as const;

export interface Tcc {
  id: number;
  titulo: string;
  resumo: string;
  palavras_chave: string;
  tipo: string;
  idioma: string;
  aluno: number;
  orientador: number;
  coorientador: number | null;
  presidente: number;
  primeiro_membro: number;
  segundo_membro: number;
  semestre_letivo_defesa: string | null;
  status: StatusTcc;
  arquivo: string | null;
  // Campos read-only do serializer
  status_display: string;
  tipo_display: string;
  idioma_display: string;
}

export interface Estatisticas {
  total_geral: number;
  por_status: Record<string, number>;
  por_tipo: Record<string, number>;
  por_idioma: Record<string, number>;
  por_semestre: Record<string, number>;
  por_orientador: Record<string, number>;
  por_coorientador: Record<string, number>;
  por_curso: Record<string, number>;
  por_departamento: Record<string, number>;
  por_unidade_academica: Record<string, number>;
}
