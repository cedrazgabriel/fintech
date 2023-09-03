import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import emptyStateImage from '../../../../../assets/empty-state.svg';
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";

export function Transactions() {
    const { areValuesVisible, isInitialLoading, transactions, isLoading } = useTransactionsController()

    const hasTransactions = transactions.length > 0
    
    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
            {isInitialLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner className="h-10 w-10" />
                </div>

            )}
            {!isInitialLoading && (
                <>
                    <header>
                        <div className="flex items-center justify-between">
                          <TransactionTypeDropdown />

                            <button>
                                <FilterIcon />
                            </button>
                        </div>

                        <div className="mt-6 relative">
                            <Swiper
                                slidesPerView={3}
                                centeredSlides
                            >
                                <SliderNavigation />
                                {MONTHS.map((month, index) => (
                                    <SwiperSlide key={month}>
                                        {({ isActive }) => (
                                            <SliderOption
                                                isActive={isActive}
                                                month={month}
                                                index={index}
                                            />
                                        )}

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                    </header>
                    <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full">
                                  <Spinner className="w-10 h-10" />
                            </div>
                        )}
                        
                        {(!hasTransactions && !isLoading) && (
                            <div className="flex flex-col items-center justify-center h-full">      
                                <img src={emptyStateImage} alt="Empty state" />
                               <p className="text-gray-700">Não encontramos nenhuma transação!</p>
                            </div>

                        )}
                        {(hasTransactions && !isLoading) && (
                            <>
                                <div className="bg-white p-4 flex items-center  justify-between gap-4 rounded-2xl">
                                    <div className="flex-1 flex items-center gap-3">
                                        <CategoryIcon type="expense" />

                                        <div>
                                            <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                                            <span className="text-sm text-gray-600">12/08/2023</span>
                                        </div>
                                    </div>

                                    <span className={cn(
                                        "text-red-800 tracking-[0.5px] font-medium",
                                        !areValuesVisible && 'blur-sm'
                                    )}>
                                        -{formatCurrency(1222.34)}
                                    </span>
                                </div>
                                <div className="bg-white p-4 flex items-center  justify-between gap-4 rounded-2xl">
                                    <div className="flex-1 flex items-center gap-3">
                                        <CategoryIcon type="income" />

                                        <div>
                                            <strong className="font-bold tracking-[-0.5px] block">Salário</strong>
                                            <span className="text-sm text-gray-600">12/08/2023</span>
                                        </div>
                                    </div>

                                    <span className={cn(
                                        "text-green-800 tracking-[0.5px] font-medium",
                                        !areValuesVisible && 'blur-sm'
                                    )}>
                                        +{formatCurrency(1222.34)}
                                    </span>
                                </div>
                            </>
                        )}

                    </div>
                </>
            )}
        </div>
    )
}