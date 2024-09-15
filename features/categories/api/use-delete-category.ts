import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';
import { InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$delete']
>;

export function useDeleteCategory(id?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[':id']['$delete']({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Category deleted!');
      // will invalidate all queries with the query keys listed
      // meaning the categories will get refetched when a new category is created
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to delete category!');
    },
  });

  return mutation;
}
