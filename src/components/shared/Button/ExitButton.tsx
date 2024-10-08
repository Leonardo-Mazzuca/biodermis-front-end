import { FaArrowRightFromBracket } from "react-icons/fa6"

import { useNavigate } from "react-router-dom";
import { Button, Flex, Popconfirm } from "antd";
import { DEFAULT_PATH } from "../../../constants/paths";
import { colors } from "../../../theme/colors";



export const ExitButton = () => {

    const navigate = useNavigate();

    const logout = () => {
        navigate(DEFAULT_PATH)
        sessionStorage.clear();
    }


    return (

        <Popconfirm
            title="Tem certeza que deseja sair?"
            onConfirm={logout}
            placement="right"
        >

            <Button     
            type="text"
            style={{
                position:'relative',
                marginLeft:'.5rem',
                width:'80px'
            }}
            >
                <Flex
                style={{
                    color:colors.primaryPurple
                }}
                gap={5} align="center">

                    <FaArrowRightFromBracket />
                    Sair    

                </Flex>

            </Button>

        </Popconfirm>

  

    );
}