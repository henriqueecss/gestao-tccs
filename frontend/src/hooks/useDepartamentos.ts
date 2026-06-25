import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartamentos, createDepartamento, updateDepartamento, deleteDepartamento } from '../api/departamentos';

export function useDepartamentos() {
  return useQuery({
    queryKey: ['departamentos'],
    queryFn: fetchDepartamentos,
  });
}

export function useCreateDepartamento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createDepartamento,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['departamentos'] }),
  });
}

export function useUpdateDepartamento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number; nome: string; sigla: string; unidade_academica: number }) =>
      updateDepartamento(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['departamentos'] }),
  });
}

export function useDeleteDepartamento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartamento,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['departamentos'] }),
  });
}
