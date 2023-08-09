import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
    email: z.string()
    .nonempty('E-mail não pode ser vazio')
    .email('Insira um e-mail válido'),
    
    password: z.string()
    .nonempty('Senha não pode estar vazia.')
    .min(8, 'Senha deve conter pelo menos 8 dígitos.'),
})

type formData = z.infer<typeof schema>;   

export function useLoginController(){
 const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<formData>({
        resolver: zodResolver(schema)
    });

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (data: SigninParams)=> {
            return authService.signin(data)
        },
    })

    const {signin} = useAuth()

    const handleSubmit = hookFormSubmit(async (data) => {
     
        try{
           const { acessTokenJWT }  = await mutateAsync(data)
            //Setar o estado de logado pra true se deu sucesso no login
            signin(acessTokenJWT)
        }
        catch{
            toast.error('Credenciais inválidas.')
        }
      
       
    })

    return { handleSubmit, register, errors, isLoading }
}