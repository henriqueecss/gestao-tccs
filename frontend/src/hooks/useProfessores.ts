import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfessores, createProfessor, updateProfessor, deleteProfessor } from '../api/professores';

export function useProfessores(search?: string) {
  return useQuery({
    queryKey: ['professores', search],
    queryFn: () => fetchProfessores(search),
  });
}

export function useCreateProfessor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProfessor,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['professores'] }),
  });
}

export function useUpdateProfessor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number; nome: string; departamento: number }) =>
      updateProfessor(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['professores'] }),
  });
}

export function useDeleteProfessor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProfessor,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['professores'] }),
  });
}
