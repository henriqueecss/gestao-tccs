import api from './axios';
import type { Curso } from '../types';

export async function fetchCursos(): Promise<Curso[]> {
  const { data } = await api.get<Curso[]>('/cursos/');
  return data;
}

export async function createCurso(body: Omit<Curso, 'id'>): Promise<Curso> {
  const { data } = await api.post<Curso>('/cursos/', body);
  return data;
}
