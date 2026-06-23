import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTccs,
  createTcc,
  updateTccStatus,
  deleteTcc,
  fetchEstatisticas,
} from '../api/tccs';

export function useTccs(search?: string) {
  return useQuery({
    queryKey: ['tccs', search],
    queryFn: () => fetchTccs(search),
  });
}

export function useCreateTcc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTcc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tccs'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
    },
  });
}

export function useUpdateTccStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateTccStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tccs'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
    },
  });
}

export function useDeleteTcc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTcc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tccs'] });
      queryClient.invalidateQueries({ queryKey: ['estatisticas'] });
    },
  });
}

export function useEstatisticas() {
  return useQuery({
    queryKey: ['estatisticas'],
    queryFn: fetchEstatisticas,
  });
}
