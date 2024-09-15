import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>['json'];

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Category created!');
      // will invalidate all queries with the query key of categories
      // meaning the categories will get refetched when a new category is created
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('Failed to create Category!');
    },
  });

  return mutation;
}
