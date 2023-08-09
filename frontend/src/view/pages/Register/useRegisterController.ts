import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from "zod";


import { authService } from '../../../app/services/authService';
import { SignupParams } from '../../../app/services/authService/signup';


const schema = z.object({
    name: z.string().nonempty('Nome não pode estar vazio'),

    email: z.string()
    .nonempty('E-mail não pode ser vazio')
    .email('Insira um e-mail válido'),
    
    password: z.string()
    .nonempty('Senha não pode estar vazia.')
    .min(8, 'Senha deve conter pelo menos 8 dígitos.'),

})

type FormData = z.infer<typeof schema>;   

export function useRegisterController(){
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (data: SignupParams)=> {
            return authService.signup(data)
        },
    })
    const handleSubmit = hookFormSubmit(async (data) => {
     
        try{
            const { acessTokenJWT } =  await mutateAsync(data)
            toast.success(acessTokenJWT)
        }
        catch{
            toast.error('Ocorreu um erro ao criar a sua conta!')
        }
      
       
    })
  

    return {register, errors, handleSubmit, isLoading}
}