import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCursos, createCurso, updateCurso, deleteCurso } from '../api/cursos';

export function useCursos() {
  return useQuery({
    queryKey: ['cursos'],
    queryFn: fetchCursos,
  });
}

export function useCreateCurso() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCurso,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cursos'] }),
  });
}

export function useUpdateCurso() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number; nome: string; sigla: string; codigo: string }) =>
      updateCurso(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cursos'] }),
  });
}

export function useDeleteCurso() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCurso,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cursos'] }),
  });
}
