import { ReactNode, createContext, useCallback,  useEffect,  useState } from 'react'
import { localStorageKeys } from '../config/localStorageKeys'
import { useQuery } from '@tanstack/react-query'
import { usersService } from '../services/userService'
import { toast } from 'react-hot-toast'
import { LaunchScreen } from '../../view/components/LaunchScreen'



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

   
    const { isError, isFetching, isSuccess, remove } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: async () =>  usersService.me(),
        enabled: signedIn,
        staleTime: Infinity,
    })

    const signin = useCallback((acessTokenJWT: string) => {
        localStorage.setItem(localStorageKeys.ACESS_TOKEN_JWT, acessTokenJWT)
      
        setSignedIn(true)

    }, [])

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACESS_TOKEN_JWT)
        remove()
        setSignedIn(false)
    }, [remove])

    useEffect(()=> {
        if (isError) {
           toast.error('Sua sessão expirou!')
           signout()
        }
    }, [isError,signout])

    
   
   
    return (
        <AuthContext.Provider
         value={{
             signedIn: isSuccess && signedIn,
             signin,
             signout
              }}
         >   
            <LaunchScreen isLoading= {isFetching} />
            {!isFetching && children}
        </AuthContext.Provider>
    )
}

