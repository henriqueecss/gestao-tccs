import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfessores, createProfessor } from '../api/professores';

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
