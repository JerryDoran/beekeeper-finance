import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>;

export function useDeleteAccount(id?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[':id']['$delete']({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account deleted!');
      // will invalidate all queries with the query keys listed
      // meaning the accounts will get refetched when a new account is created
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to delete account!');
    },
  });

  return mutation;
}
