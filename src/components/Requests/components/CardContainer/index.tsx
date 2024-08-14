import { Flex, Skeleton } from "antd";
import { ProgressCard } from "../../../shared/Card/ProgressCard";
import { useRequestCardItem } from "../../hooks/useRequestCardItems";
import { getColorStylesByKey } from "./functions/getColorStylesByKey";


export const CardContainer = () => {

    const {items ,isLoading} = useRequestCardItem();

    return (

        <Flex wrap gap={8} align="center">

            {items.map((item) => {

                return (

                    isLoading ? <>
                    
                        <Skeleton key={item.key} />
                    
                    </> : 
                    (

                        <ProgressCard.Root 
                        key={item.key}
                        style={getColorStylesByKey(item.key)}
        
                        >
                            
                            <ProgressCard.Percentual
                             percent={item.percent} 
                             strokeColor={item.strokeColor}
                             
                             />
            
                            <ProgressCard.Content
                            title={item.title}
                            subText={item.subText}
                            />
                            
                        </ProgressCard.Root>        


                    )
                
           
                );

            })}

        </Flex>

    );

}