import api from './axios';
import type { Tcc, Estatisticas } from '../types';

export async function fetchTccs(search?: string): Promise<Tcc[]> {
  const params = search ? { search } : {};
  const { data } = await api.get<Tcc[]>('/tccs/', { params });
  return data;
}

export async function fetchTcc(id: number): Promise<Tcc> {
  const { data } = await api.get<Tcc>(`/tccs/${id}/`);
  return data;
}

export async function createTcc(formData: FormData): Promise<Tcc> {
  const { data } = await api.post<Tcc>('/tccs/', formData);
  return data;
}

export async function updateTcc(id: number, formData: FormData): Promise<Tcc> {
  const { data } = await api.patch<Tcc>(`/tccs/${id}/`, formData);
  return data;
}

export async function updateTccStatus(id: number, status: string): Promise<Tcc> {
  const { data } = await api.patch<Tcc>(`/tccs/${id}/`, { status });
  return data;
}

export async function deleteTcc(id: number): Promise<void> {
  await api.delete(`/tccs/${id}/`);
}

export async function fetchEstatisticas(): Promise<Estatisticas> {
  const { data } = await api.get<Estatisticas>('/tccs/estatisticas/');
  return data;
}
