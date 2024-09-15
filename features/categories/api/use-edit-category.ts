import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[':id']['$patch']
>['json'];

export function useEditCategory(id?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[':id']['$patch']({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Category updated!');
      // will invalidate all queries with the query key of categories
      // meaning the categories will get refetched when a new category is created
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to edit category!');
    },
  });

  return mutation;
}
