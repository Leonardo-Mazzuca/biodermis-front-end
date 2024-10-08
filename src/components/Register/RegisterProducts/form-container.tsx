
import { useForm } from "react-hook-form"
import { ProductsDescForm } from "./product-desc-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsDimensionForm } from "./product-dimension-form";
import { Uploader } from "./images-uploader";
import { ProductsPricesForm } from "./product-price-form";
import { Button, Form } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { api } from "../../../service/connection";
import { useMessageAction } from "../../../hooks/useMessageAction";
import { getHeaders } from "../../../service/getHeaders";
import { ProductsData, productsSchema } from "../../../validations/registerProductValidation";



export const FormContainer = () => {


    const {success,error,contextHolder} = useMessageAction();
    
    const {formState:{errors},handleSubmit,control, reset} = useForm<ProductsData>({
        resolver: zodResolver(productsSchema),
        criteriaMode: 'all',
        mode: 'all'
    });


    const [data, setData] = useState({} as ProductsData)
    const [finish, setSuccess] = useState(false);
    const [id, setId] = useState<number>(0);


    const registerImage = useCallback(async () => {

        const formData = new FormData();
        
        data.files.map((image:any) => {
            formData.append('files', image.originFileObj as File || image); 
        });


        const headers = {
            ...getHeaders(),
            'Content-Type': 'multipart/form-data' 
          };
        

            try {
    
                await api.post(`/produtos/fotos/${id}`, formData, {
                    headers
                });
    
            } catch (error) {
        
            }

        

        
    },[id]);

    useEffect(()=> {

        if(finish && data) {

            registerImage();

        }

    },[finish, registerImage, id])

    const mutation = useMutation({
        mutationFn: async (data:ProductsData)=> {


            const body = {

                "nome": data.productName,
                "descricao": data.description,
                "valormin": data.minPrice,
                "valormax": data.maxPrice,
                "valorvenda": data.sellPrice,
                "altura": data.height,
                "peso": data.weight,
                "largura": data.width,
                "profundidade": data.depth,
                "categoria_ids": data.category

            }
            
            const headers = getHeaders();
            

            const req = await api.post('/produtos',body, {
                headers,
            })


            return req.data;

        },
        onSuccess: (res, context:ProductsData)=> {

            setData(context)
            setId(res.idProduct)
            setSuccess(true)
            success(res.success);
            onReset();
       
        },
        onError: (err:any)=> {

            error(err.response.data.error);
            
        },
    })

    const onSubmit = (data:ProductsData) => {

        mutation.mutate(data);
        
    }

    const [form] = Form.useForm();

    const uploaderRef = useRef<any>();

    
    const onReset = () => {

        form.resetFields();
        reset({});
        if (uploaderRef.current) {
            uploaderRef.current.resetFiles();
        }
        
    };

    
    return (

        <Form
        form={form}
        onFinish={handleSubmit(onSubmit)}
        className="w-full"
        layout="vertical"
        >   

        {contextHolder}

            <div className="flex lg:flex-row flex-col gap-10 w-full">

                <div>

                    <ProductsDescForm
                        errors={errors}
                        control={control}
                
                    />

                    <ProductsDimensionForm 
                        errors={errors}
                        control={control}
                    />
                

                </div>

                <div className="w-full">

                    <Uploader 
                        
                        ref={uploaderRef}
                        errors={errors}
                        control={control}
                    />
              
                    <ProductsPricesForm 
                        errors={errors}
                        control={control}
                    
                    />

                    <div className="flex gap-2 mt-10">

                    <Button
                    className="w-1/3" 
                    htmlType="submit"
                    aria-label="submit fields"
                    >

                   
                         Enviar
                                
        

                    </Button>

                    <Button 
                        className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                        htmlType="reset"
                        onClick={onReset}
                        aria-label="reset fields"
                    >
                        
             

                           cancelar
                                

                        
                    </Button>

                    </div>



                </div>
                
        
            </div>


        </Form>
    )

}