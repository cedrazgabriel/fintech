import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController(){
    const {areValuesVisible} = useDashboard()

    const [isFiltersModalOpen, setIsFilterModalOpen] = useState(true)

    function handleOpenFiltersModal(){
        setIsFilterModalOpen(true)
    }

    function handleCloseFiltersModal(){
        setIsFilterModalOpen(false)
    }

    return {
        areValuesVisible,
        isInitialLoading: false,
        transactions: [],
        isLoading: false,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        isFiltersModalOpen
    }
}