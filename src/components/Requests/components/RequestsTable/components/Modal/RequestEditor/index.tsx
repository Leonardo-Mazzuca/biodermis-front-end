

import { HiMiniPencilSquare } from "react-icons/hi2";
import { Heading } from "../../../../../../shared/Heading";
import { Text } from "../../../../../../shared/Text";
import { InputDatePicker } from "../../../../../../shared/Input/DatePicker";
import { Input } from "../../../../../../shared/Input/Input";
import { Flex } from "antd";
import { Form } from "antd/lib";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalFooter } from "./ModalFooter";

import { useState } from "react";
import { api } from "../../../../../../../service/connection";
import { getHeaders } from "../../../../../../../service/getHeaders";
import Select from "../../../../../../shared/Input/Select";
import { useMutation } from "@tanstack/react-query";
import { useMessageAction } from "../../../../../../../hooks/useMessageAction/useMessageAction";
import { Requests } from "../../../../@types/Requests";
import { NumericFormatter } from "../../../../../../shared/Formatter/NumericFormatter";



const Footer = ModalFooter;

const shippingOptions = [
    {
        value: 'sedex',
        label: 'Sedex',
    },
    {
        value: 'correios',
        label: 'Correios',
    },
    {
        value: 'pac',
        label: 'PAC',
    },
]


type RequestEditorProps = {
    handleClose: () => void
    id: number,
    data:Requests
}

export const RequestEditor = ({handleClose, id,data}:RequestEditorProps) => {

    const [isClicked, setIsClicked] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(shippingOptions[0].label);
    const {success, error, contextHolder} = useMessageAction();
    

    const sendSchema = z.object({
        sendDate: z.string({required_error: 'Data de envio é obrigatória'})
        .min(1,'A data de validade não pode ser vazia...'),
        sendCode: z.string({required_error: 'Código de envio é obrigatório'})
        .min(1,'O código de envio não pode ser vazio...'),
        shippingForm: z.string().optional(),
    })




    type SendData = z.infer<typeof sendSchema>


    const [form] = Form.useForm();

    const {handleSubmit,control, formState:{errors}} = useForm<SendData>({
        resolver: zodResolver(sendSchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            shippingForm: shippingOptions[0].value,
        }
    });

    const updateRequest = useMutation({
        mutationFn: async (data:SendData) => {
            
        const headers = getHeaders();


        const body = {
            statusentrega: "realizada",
            formaenvio: data.shippingForm,
            dataenvio:data.sendDate,
            codigorastreio:data.sendCode
        }

        
        const req = await api.patch(`/pedidos/${id}`, body, {
            headers
        });

        return req.data

        
        },
        onSuccess: (res) => {
            success(res.success);
            
            setTimeout(()=> {
                handleClose(); 
                window.location.reload()
            },2000)
     
        },
        onError: (err:any) => {
            error(err.response.data.error)
        }
    })
  


    const onSubmit = (data:SendData) => {

        updateRequest.mutate(data);

    }

    return (

        <Form 
            form={form} 
            className="flex justify-between flex-col"
            onFinish={handleSubmit(onSubmit)}
        >

            {contextHolder}


            <div className="px-4">

                <Flex className="flex-col">
                    <div className="mb-10">

                    <Heading.Root>
                        <Heading.Content content="Adicionar código de envio" />
                    </Heading.Root>

                    </div>

                    <Flex className="w-full px-10" gap={10} justify="space-between">


                        <Flex vertical align="center" gap={2}>

                        <Heading.Root>
                            
                            {data.id}
                         
                        </Heading.Root>

                        <Text.Root className="text-gray-neutral-950 my-3">
                            <Text.Content content={"Codigo do pedido"} />
                        </Text.Root>

                        </Flex>

                        <Flex vertical align="center" gap={2}>

                        <Heading.Root>


                            {
                                !isClicked ?
                                (
                                    <>
                                            {selected}
                                            <Heading.Icon 
                                            className="cursor-pointer hover:text-brand-purple/25 text-brand-purple" 
                                            icon={HiMiniPencilSquare}
                                            onClick={() => setIsClicked(!isClicked)}
                                            />
                                    </>
                                ) : 
                                (
                                    <Controller 
                                    control={control}
                                    name="shippingForm"
                                    render={({field:{onChange}})=> (

                                        <Select
                                        
                                        options={shippingOptions}
                                        defaultValue={shippingOptions[0]}
                                     
                                        onChange={(e)=> {
                                               // @ts-ignore
                                            onChange(e?.value)
                                            setIsClicked(!isClicked)
                                               // @ts-ignore
                                            setSelected(e?.label)
                                        }}
                                        />
                                    )}
                                    />
                                )
                            }
                          

    

                            
                         
                        </Heading.Root>

                        <Text.Root className="text-gray-neutral-950 my-3">
                            <Text.Content content={"Forma de envio"} />
                        </Text.Root>

                        </Flex>

                        <Flex vertical align="center" gap={2}>

                        <Heading.Root>
                            
                           <NumericFormatter value={parseFloat(data.valorfrete)} />
                         
                        </Heading.Root>

                        <Text.Root className="text-gray-neutral-950 my-3">
                            <Text.Content content={"Valor do frete"} />
                        </Text.Root>

                        </Flex>


                    </Flex>
                </Flex>


                <div className="my-3">

                    <div className="my-3">
                        <Text.Root className="text-gray-neutral-600 my-2 font-[600] ">
                            <Text.Content content="Data de envio" />
                        </Text.Root>

                        <Controller 
                        control={control}
                        name="sendDate"
                        render={({field:{onChange}}) => (

                            <Form.Item
                                name="sendDate"
                                validateStatus={errors.sendDate ? 'error' : 'success'}
                                help={errors.sendDate && errors.sendDate.message}
                                hasFeedback
                            >

                                    <InputDatePicker 
                                    onChange={(_,dateString)=> (
                                        onChange(dateString)
                                    )}
                                />

                            </Form.Item>


                        )}
                        
                        />
                    </div>

                    <div className="my-3">


                        <Controller 
                           name="sendCode"
                           control={control}
                           render={({field:{onChange}})=>(

                            <Form.Item 
                                name="sendCode"
                                validateStatus={errors.sendCode ? 'error' : 'success'}
                                help={errors.sendCode && errors.sendCode.message}
                                hasFeedback
                            >

                                <Input.Root className="my-2">

                                    <Input.Label 
                                    content="Código de envio"
                                    htmlFor="sendCode" 
                                    className="text-gray-neutral-600 font-[600]"
                                    />

                                    <Input.System 
                                    id="sendCode"
                                    className="border-purple-solid-950 placeholder-purple-solid-950 text-sm font-[600]"
                                    placeholder="Código de envio"
                                    onChange={onChange}
                                    />

                                </Input.Root>

                            </Form.Item>

                            )}

                        />
    

                    </div>


                </div>

                
                <Footer.Root>


                        <Footer.Actions
                        onClick={handleClose}
                        content="Cancelar"
                        key="cancel"
                        type="button"
                    
            
                    >
                        Cancelar
                    </Footer.Actions>

                    <Footer.Actions 
                        content="Confirmar"
                        type="submit"

                    >
                        Confirmar
                    </Footer.Actions>

                </Footer.Root>

            </div>


           


        </Form>


    );
    
}