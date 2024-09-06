import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>['json'];

export function useBulkDeleteAccounts() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts['bulk-delete']['$post']({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account(s) deleted!');
      // will invalidate all queries with the query key of accounts
      // meaning the accounts will get refetched when a new account is created
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.error('Failed to delete account(s)!');
    },
  });

  return mutation;
}
