import api from './axios';
import type { Professor } from '../types';

export async function fetchProfessores(search?: string): Promise<Professor[]> {
  const params = search ? { search } : {};
  const { data } = await api.get<Professor[]>('/professores/', { params });
  return data;
}

export async function createProfessor(body: Omit<Professor, 'id'>): Promise<Professor> {
  const { data } = await api.post<Professor>('/professores/', body);
  return data;
}

export async function updateProfessor(id: number, body: Omit<Professor, 'id'>): Promise<Professor> {
  const { data } = await api.put<Professor>(`/professores/${id}/`, body);
  return data;
}

export async function deleteProfessor(id: number): Promise<void> {
  await api.delete(`/professores/${id}/`);
}
