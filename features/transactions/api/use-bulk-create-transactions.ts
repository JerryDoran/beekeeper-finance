import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-create']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-create']['$post']
>['json'];

export function useBulkCreateTransactions() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions['bulk-create']['$post']({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Transactions created!');
      // will invalidate all queries with the query key of transactions
      // meaning the transactions will get refetched when a new account is created
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.error('Failed to create transactions!');
    },
  });

  return mutation;
}
