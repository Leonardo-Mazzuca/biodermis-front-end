
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import z from 'zod'
import { Button } from "../../../../shared/Button";
import { PessoalDataForm } from "./components/PessoalDataForm";
import { AddressDataForm } from "./components/AddressDataForm";
import { BankDataForm } from "./components/BankDataForm";
import { isPixKey } from "../../../../../functions/Validators/ValidatePixKey";
import { isPhoneNumber } from "../../../../../functions/Validators/ValidatePhoneNumber";
import { isCpf } from "../../../../../functions/Validators/ValidateCPF";
import { Uploader } from "./components/Uploader";
import { Checkboxes } from "./components/Checkboxes";
import { useEffect, useState } from "react";
import { UserRole } from "../../../../../util/UserRole";
import { validateCardNumber } from "../../../../../functions/Validators/ValidateCreditCard/validateCardNumber";
import { validateExpireDate } from "../../../../../functions/Validators/ValidateCreditCard/validateExpireDate";
import { validateCVV } from "../../../../../functions/Validators/ValidateCreditCard/validateCVV";


const pessoalDataSchema = z.object({

    name: z.string({required_error: 'O nome é obrigatório'})
    .min(1,'O nome não pode ser vazio')
    .transform(name => {
        return name.trim().split(' ').map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ')
    
      }),

    cpf: z.string({required_error: 'cpf é necessário para o cadastro'})
    .min(1, 'CPF é necessário para o cadastro')
    .refine(value => isCpf(value),{message: 'cpf inválido digitado'})
    ,
    email: z.string({required_error: 'email não pode ser vazio'})
    .min(1,'E-mail é necessário para o cadastro'),

    phone: z.string({required_error: 'Número de telefone é necessário para o cadastro'})
    .min(1, 'Número de telefone é necessário para o cadastro')
    .refine(phone => isPhoneNumber(phone),{message: 'Número de telefone inválido'})
})

const addressDataSchema = z.object({

    address: z.string({required_error: 'Endereço não pode ser vazio'})
    .min(1,'Endereço é obrigatório para o cadastro'),

    cep: z.string({required_error: 'CEP é necessário para o cadastro'})
    .min(1,'CEP é obrigatório para o cadastro'),

    street: z.string({required_error: 'Rua é necessário para o cadastro'})
    .min(1,'Rua é obrigatório para o cadastro'),

    neighborhood: z.string({required_error: 'Bairro é necessário para o cadastro'})
    .min(1,'Bairro é obrigatório para o cadastro'),

    city: z.string({required_error: 'Cidade é necessário para o cadastro'})
    .min(1,'Cidade é obrigatório para o cadastro'),

    number: z.string({required_error: 'Número é necessário para o cadastro'})
    .min(1,'Número é obrigatório para o cadastro'),

    complement: z.string({required_error: 'Complemento é necessário para o cadastro'})
    .min(1,'Complemento é obrigatório para o cadastro'),

})

const bankDataChema = z.object({
    cardNumber: z.string({required_error: 'Número do cartão é necessário para o cadastro'})
        .min(1)
        .refine(val => validateCardNumber(val),{message: 'Número do cartão inválido'}),

    cvv: z.string({required_error: 'CVV é necessário para o cadastro'})
    .min(1,'CVV do cartão é obrigatório para o cadastro')
    .max(3, 'CVV não pode ter mais do que 3 digitos')
    .refine(val => validateCVV(val),{message: 'CVV inválido inserido'}),

    titularName: z.string({required_error: 'Nome do titular é obrigatório para o cadastro'})
    .min(1,'Nome do titular não pode ser vazio')
    .transform(name => {
        return name.trim().split(' ').map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ')
    
      })
    ,

    expireDate: z.string({required_error: 'Data de validade é obrigatória para o cadastro'})
    .min(1,'A data de validade é necessário para o cadastro')
    .refine(date => validateExpireDate(date),{message: 'Data de validade inválida'}),

    agency: z.string({required_error: 'Número da Agencia é obrigatório para o cadastro'})
    .min(1,'Número da Agencia não pode ser vazio'),

    pix: z.string({required_error: 'Chave pix é obrigatória para o cadastro'})
    .min(1,'Chave píx não pode ser vazia')
    .refine(pixkey=> isPixKey(pixkey),{message: 'Chave pix inválida inserida'}),
    
    bank: z.string({required_error:'Banco é obrigatório para cadastro'})
    .min(1,'Banco é obrigatório para o cadastro'),
})



const userSchema = z.object({
    ...pessoalDataSchema.shape,
    ...addressDataSchema.shape,
    userRole: z.string(),
    bankData: bankDataChema.optional(),
    certificated: z.object({
        name: z.string(), 
        size: z.number().min(1,'O certificado é obrigatório para o cadastro'),
        type: z.string(), 
    },{required_error: 'Certificado é obrigatório para usuários do tipo consultor'})
    .optional(),
}).refine(schema => {
    if (schema.userRole === 'consultor') {
       
        return schema.bankData && schema.certificated;
    }

    return true;
}, {
    message: 'Certificado e dados bancários são obrigatórios para consultores'
});


export type ConsultorsData = z.infer<typeof userSchema>;

export const FormContainer = () => {

    const [isConsultor, setIsConsultor] = useState(false);
    const {register,handleSubmit,formState:{errors},control,watch} = useForm<ConsultorsData>({
    
        resolver: zodResolver(userSchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            userRole: UserRole.ADMIN
        }

    });

    const userRole = watch('userRole');

    useEffect(()=> {

        if(userRole === 'consultor'){
            setIsConsultor(true)
        } else {
            setIsConsultor(false)
        }
        
    },[watch,isConsultor,userRole])


    const onSubmit = (data:ConsultorsData) => {

        
        console.log(data);
        
    }

    return (

        <div className="max-w-2xl">

            <form

            onSubmit={handleSubmit(onSubmit)}
            >

                <PessoalDataForm 
                errors={errors}
                control={control}
                />

                <AddressDataForm 
                 errors={errors}
                 register={register}
                 control={control}

                />

                {isConsultor &&
                   <BankDataForm 
                   errors={errors}
                   register={register}
                   control={control}
                  />
                }
             

          
                <Checkboxes
                errors={errors}
                register={register}
                control={control}
                />
                


                {isConsultor &&
                    <Uploader 
                    control={control}
                    errors={errors}
                    register={register}
                    />
                }    

                <div className="flex gap-2 mt-10">

                    <Button.Root className="w-1/3" type="submit">

                        <Button.Wrapper>
                            <Button.Content 
                                content="Enviar"
                                />
                        </Button.Wrapper>

                    </Button.Root>

                    <Button.Root className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950" type="reset">
                        
                        <Button.Wrapper>

                            <Button.Content 
                                content="cancelar"
                                />

                        </Button.Wrapper>
                        
                    </Button.Root>

                </div>

                </form>

            </div>


    );
}