import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUnidades, createUnidade, updateUnidade, deleteUnidade } from '../api/unidades';

export function useUnidades() {
  return useQuery({
    queryKey: ['unidades'],
    queryFn: fetchUnidades,
  });
}

export function useCreateUnidade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUnidade,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['unidades'] }),
  });
}

export function useUpdateUnidade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number; nome: string; sigla: string }) =>
      updateUnidade(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['unidades'] }),
  });
}

export function useDeleteUnidade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUnidade,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['unidades'] }),
  });
}
