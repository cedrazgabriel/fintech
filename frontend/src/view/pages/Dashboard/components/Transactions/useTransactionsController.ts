import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController(){
    const {areValuesVisible} = useDashboard()

    return {
        areValuesVisible,
        isInitialLoading: false,
        transactions: [],
        isLoading: false,
    }
}