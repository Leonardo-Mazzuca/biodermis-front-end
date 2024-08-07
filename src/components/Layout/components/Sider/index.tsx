import Sider from "antd/es/layout/Sider"
import { Menu } from "../Menu"
import { Logo } from "../../../shared/Logo"
import { useState } from "react";
import { theme } from "antd";


export const S = () => {

    const [_,setCollapsed] = useState(false);

    const {

        token: { colorBgContainer, boxShadow },
    
    } = theme.useToken();

    return (

        <Sider
        width={220}
        className="lg:relative fixed lg:z-auto z-[999]"
        style={{ 
            background: colorBgContainer , 
            boxShadow: boxShadow, 
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={setCollapsed}
        collapsible

        
        >

        <Logo />

        <Menu />

      </Sider>

    )

}