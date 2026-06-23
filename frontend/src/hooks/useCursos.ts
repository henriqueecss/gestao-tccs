import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCursos, createCurso } from '../api/cursos';

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
