import api from './axios';
import type { Departamento } from '../types';

export async function fetchDepartamentos(): Promise<Departamento[]> {
  const { data } = await api.get<Departamento[]>('/departamentos/');
  return data;
}

export async function createDepartamento(body: Omit<Departamento, 'id'>): Promise<Departamento> {
  const { data } = await api.post<Departamento>('/departamentos/', body);
  return data;
}
