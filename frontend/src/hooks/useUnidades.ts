import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUnidades, createUnidade } from '../api/unidades';

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
