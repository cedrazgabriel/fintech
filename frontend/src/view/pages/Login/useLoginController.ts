import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors },
    } = useForm<formData>({
        resolver: zodResolver(schema)
    });

    const handleSubmit = hookFormHandleSubmit((data)=> {
      //Utilizando o zodResolver, podemos presumir que os dados do form estão validos valido
      console.log('chama a api utilizando o: ', data)

    })

    

    return { handleSubmit, register, errors }
}