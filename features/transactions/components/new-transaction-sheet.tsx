import { z } from 'zod';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { insertTransactionSchema } from '@/db/schema';
import { useCreateTransactions } from '@/features/transactions/api/use-create-transactions';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useCreateAccounts } from '@/features/accounts/api/use-create-accounts';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';
import TransactionForm from '@/features/transactions/components/transaction-form';
import { Loader2 } from 'lucide-react';

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export default function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();

  const createTransactionMutation = useCreateTransactions();

  // Categories
  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name?: string) => {
    if (name) {
      categoryMutation.mutate({ name });
    } else {
      console.error('Category name is required');
    }
  };

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  // Accounts
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccounts();
  const onCreateAccount = (name?: string) => {
    if (name) {
      accountMutation.mutate({ name });
    } else {
      console.error('Account name is required');
    }
  };
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    createTransactionMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  function onSubmit(values: FormValues) {
    createTransactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='size-4 text-muted-foreground animate-spin' />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
