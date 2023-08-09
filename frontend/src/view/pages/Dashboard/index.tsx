import { useAuth } from "../../../app/hooks/useAuth"

export function Dashboard(){
    const {signout} = useAuth()
    return (
        <div>
            <h1>Dashboard Page</h1> 
            <button onClick={signout}>Sair</button> 
        </div>
       
    )
}