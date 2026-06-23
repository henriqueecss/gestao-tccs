import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAlunos, createAluno } from '../api/alunos';

export function useAlunos(search?: string) {
  return useQuery({
    queryKey: ['alunos', search],
    queryFn: () => fetchAlunos(search),
  });
}

export function useCreateAluno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAluno,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alunos'] }),
  });
}
