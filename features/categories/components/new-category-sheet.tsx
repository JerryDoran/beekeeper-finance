import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { insertCategorySchema } from '@/db/schema';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';
import CategoryForm from '@/features/categories/components/category-form';

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
