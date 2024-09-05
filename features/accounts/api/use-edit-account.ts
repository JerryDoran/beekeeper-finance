import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[':id']['$patch']
>['json'];

export function useEditAccount(id?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[':id']['$patch']({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account updated!');
      // will invalidate all queries with the query key of accounts
      // meaning the accounts will get refetched when a new account is created
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to edit account!');
    },
  });

  return mutation;
}
