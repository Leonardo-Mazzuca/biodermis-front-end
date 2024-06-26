import { GoClock } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";



export const buildInvoicingIcon = (status:string) => {

    switch(status) {

        case 'aguardando':
            return (
                
                <div className="bg-yeallow-solid-400 rounded-md h-[50px] w-[50px] flex items-center justify-center">
        
                    <GoClock  className="text-yeallow-solid-900 text-xl" />
        
                </div>
            )

        case 'realizado':
            return (
                
                <div className="bg-green-solid-300 rounded-md flex items-center justify-center h-[50px] w-[50px]">
        
                    <FaCheck className="text-green-solid-900 text-sm" />
        
                </div>
            )
    }


}