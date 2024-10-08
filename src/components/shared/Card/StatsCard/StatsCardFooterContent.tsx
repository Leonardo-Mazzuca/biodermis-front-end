import { Flex } from "antd";

import { Text } from "../../Text"
import Title from "../../Typography/typography-title";
import React from "react";

type FooterContentProps = {
    headingContent: React.ReactNode;
    textContent: React.ReactNode;
 
}


export const StatsCardFooterContent = ({headingContent,textContent}:FooterContentProps) => {
    return (
        <div className="flex items-center gap-2">
            <Title className="text-black text-[32px] fw-bold">
                {headingContent} 
            </Title>
            <Flex vertical>
                <Text.Root>
                    <Text.Content content={textContent}/>
                </Text.Root>
            </Flex>
        </div>
    )
}