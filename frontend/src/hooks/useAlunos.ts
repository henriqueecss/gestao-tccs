import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAlunos, createAluno, updateAluno, deleteAluno } from '../api/alunos';

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

export function useUpdateAluno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number; nome: string; matricula: string; curso: number }) =>
      updateAluno(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alunos'] }),
  });
}

export function useDeleteAluno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAluno,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alunos'] }),
  });
}
