import { ReactNode, createContext, useCallback, useState } from 'react'
import { localStorageKeys } from '../config/localStorageKeys'
import { useQuery } from '@tanstack/react-query'
import { usersService } from '../services/userService'


interface AuthContextValue {
    signedIn: boolean,
    signin(acessToken: string): void,
    signout(): void,
}

 export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: ReactNode}){
    const [signedIn, setSignedIn] = useState<boolean>(()=> {
        const storedAcessTokenJWT = localStorage.getItem(localStorageKeys.ACESS_TOKEN_JWT)

        return !!storedAcessTokenJWT;
    })

    useQuery({
        queryKey: ['users', 'me'],
        queryFn: async () =>  usersService.me(),
    })

    const signin = useCallback((acessTokenJWT: string) => {
        localStorage.setItem(localStorageKeys.ACESS_TOKEN_JWT, acessTokenJWT)
    
        setSignedIn(true)
    }, [])

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACESS_TOKEN_JWT)
        setSignedIn(false)
    }, [])

    return (
        <AuthContext.Provider value={{ signedIn, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}

