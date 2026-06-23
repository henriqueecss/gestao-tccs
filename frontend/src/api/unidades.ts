import api from './axios';
import type { UnidadeAcademica } from '../types';

export async function fetchUnidades(): Promise<UnidadeAcademica[]> {
  const { data } = await api.get<UnidadeAcademica[]>('/unidades-academicas/');
  return data;
}

export async function createUnidade(body: Omit<UnidadeAcademica, 'id'>): Promise<UnidadeAcademica> {
  const { data } = await api.post<UnidadeAcademica>('/unidades-academicas/', body);
  return data;
}
