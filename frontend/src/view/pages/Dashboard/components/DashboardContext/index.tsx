import { createContext, useCallback, useState } from "react";

interface DashboardContextValue{
    areValuesVisible: boolean
    toglleValuesVisibility(): void
}
export const DashboardContext = createContext({} as DashboardContextValue)


export function DashboardProvider ({ children }: { children: React.ReactNode }){

    const [areValuesVisible, setAreValuesVisible] = useState(true)

    const toglleValuesVisibility = useCallback(() => {
        setAreValuesVisible(prevState => !prevState)
    }, [])

 return (
    <DashboardContext.Provider value={{ areValuesVisible, toglleValuesVisibility }}>
        {children}
    </DashboardContext.Provider>
 )
}