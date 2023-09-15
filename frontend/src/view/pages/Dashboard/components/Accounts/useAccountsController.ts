import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController(){
    const windowWidth = useWindowWidth();
    const {areValuesVisible, toglleValuesVisibility,openNewAccountModal} = useDashboard()
    
    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    })

    return {
         sliderState,
         isLoading: false,
         accounts: [],
         windowWidth,
         areValuesVisible,
         setSliderState,
         toglleValuesVisibility,
         openNewAccountModal,
        }
}