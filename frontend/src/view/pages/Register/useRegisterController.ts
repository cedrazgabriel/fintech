import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { authService } from '../../../app/services/authService';


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

    const handleSubmit = hookFormSubmit(async (data) => {
       const { acessTokenJWT } =  await authService.signup(data)

       console.log({acesstoken: acessTokenJWT})
    })

    return {register, errors, handleSubmit}
}