import api from './axios';
import type { Aluno } from '../types';

export async function fetchAlunos(search?: string): Promise<Aluno[]> {
  const params = search ? { search } : {};
  const { data } = await api.get<Aluno[]>('/alunos/', { params });
  return data;
}

export async function createAluno(body: Omit<Aluno, 'id'>): Promise<Aluno> {
  const { data } = await api.post<Aluno>('/alunos/', body);
  return data;
}
