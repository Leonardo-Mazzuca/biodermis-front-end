import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { Button } from "../../../shared/Button";
import { Modal } from "antd";
import { WithDrawalModal } from "../Modal";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";



export const WithdrawalActions = () => {

    
    const { confirm } = Modal;

    const showRequestStats = () => {

        confirm({

            content: <WithDrawalModal />,
            closable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            width: '40%',
            maskClosable: true,
            

          });

    }



    return (

        
        <Button.Root 
                className="w-2/3 font-semibold"
                onClick={showRequestStats}
        >

                <Button.Wrapper>

                    <Button.Content content="Efetuar Pagamento" />
                    <Button.Icon icon={IoIosArrowForward } />

                </Button.Wrapper>

        </Button.Root>
        
  
    );


}