import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartamentos, createDepartamento } from '../api/departamentos';

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
