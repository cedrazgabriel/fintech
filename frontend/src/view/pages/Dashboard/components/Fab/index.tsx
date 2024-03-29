import { PlusIcon } from '@radix-ui/react-icons';
import { DropMenu } from '../../../../components/DropMenu';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { useDashboard } from '../DashboardContext/useDashboard';

export function Fab() {

  const {
    openNewAccountModal,
    openNewTransactionModal,
  } = useDashboard();

  return (
   <div
    className='fixed right-4 bottom-4'
   >
     <DropMenu.Root>
      <DropMenu.Trigger>
        <button
          className='text-white w-12 h-12 bg-teal-900 flex items-center justify-center rounded-full'
        >
          <PlusIcon
            className='w-6 h-6'
          />
        </button>
      </DropMenu.Trigger>

      <DropMenu.Content>
        <DropMenu.Item
          onSelect={() => openNewTransactionModal('EXPENSE')}
          className='gap-2'
        >
          <CategoryIcon type='expense' />
          Nova Despesa
        </DropMenu.Item>
        <DropMenu.Item
          onSelect={() => openNewTransactionModal('INCOME')}
          className='gap-2'
        >
          <CategoryIcon type='income' />
          Nova Receita
        </DropMenu.Item>
        <DropMenu.Item
          onSelect={openNewAccountModal}
          className='gap-2'
        >
          <BankAccountIcon />
          Nova Conta
        </DropMenu.Item>
      </DropMenu.Content>

    </DropMenu.Root>
   </div>
  )
}
