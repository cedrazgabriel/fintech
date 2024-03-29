import { BankAccountEntity } from '../../../../../app/entities/BankAccount';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/bankAccountTypeIcon';
import { useDashboard } from '../DashboardContext/useDashboard';

interface AccountCardProps {
  data: BankAccountEntity;
}


export function AccountCard({ data }: AccountCardProps) {

  const { color, name, currentBalance, type } = data;

  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <div
      className='p-4 bg-white border rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-b-teal-950'
      style={{ borderBottomColor: color }}
      role='button'
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className='text-gray-800 font-medium tracking-[0.5px] mt-4 block' >
          {name}
        </span>
      </div>
      <div>
        <span className={cn(
          'text-gray-800 font-medium tracking-[0.5px] block',
          !areValuesVisible && 'blur-[6px]'
        )} >
          {formatCurrency(currentBalance)}
        </span>
        <small className='text-gray-600 text-sm' >
          Saldo atual
        </small>
      </div>
    </div>
  );
}
