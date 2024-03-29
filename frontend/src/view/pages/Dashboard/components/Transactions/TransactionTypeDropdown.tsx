import { ChevronDownIcon } from '@radix-ui/react-icons';
import { DropMenu } from '../../../../components/DropMenu';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';

interface TransactionTypeDropDownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void
  selectedType: 'INCOME' | 'EXPENSE' | undefined
}

export function TransactionTypeDropDown({ onSelect, selectedType }: TransactionTypeDropDownProps) {
  return (
    <DropMenu.Root>
      <DropMenu.Trigger>
        <button className='flex items-center gap-2'>
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />
}

          <span className='text-gray-800 tracking-tighter font-medium text-sm' >
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === undefined && 'Transações'}
          </span>

          <ChevronDownIcon className='text-gray-900' />
        </button>
      </DropMenu.Trigger>

      <DropMenu.Content
        className='w-[278px]'
      >
        <DropMenu.Item
          className='gap-2'
          onSelect={() => onSelect('INCOME')}
        >
          <IncomeIcon />
          Receitas
        </DropMenu.Item>
        <DropMenu.Item
          className='gap-2'
          onSelect={() => onSelect('EXPENSE')}
        >
          <ExpensesIcon />
          Despesas
        </DropMenu.Item>
        <DropMenu.Item
          className='gap-2'
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropMenu.Item>
      </DropMenu.Content>
    </DropMenu.Root>
  )
}
