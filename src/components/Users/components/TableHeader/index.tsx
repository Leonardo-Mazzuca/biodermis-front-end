import { FaPlus } from "react-icons/fa6";
import { Button } from "../../../shared/Button";
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Input } from "../../../shared/Input/Input";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";


import { useNavigate } from "react-router-dom";
import { REGISTER_CONSULTOR } from "../../../../constants/paths/paths";
import Select from "../../../shared/Input/Select";
import { userSelectOptions } from "./util/selectOptions";


export const TableHeader = ({columnsFilters, setColumnFilters}:TableFiltersProps) => {


    const username = columnsFilters.find((f) => f.id === "nome")?.value || "";

    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));
      
    const navigate = useNavigate();

    return (

        <TableHeaderWrapper 
         heading="Lista de usuários"
        >

            <div className="flex flex-wrap w-full justify-between items-center">

                <div className="flex flex-wrap gap-2">
                        
                        <Input.Root className="w-full lg:w-[400px]">

                            <Input.System
                            className="py-2 w-full"
                            placeholder="Buscar"
                            suffix= {<SearchIcon />}
                            value={username as string}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                              onFilterChange('nome',e.target.value)
                            }}
    
                            />
                        
                        </Input.Root>
                        
                        <Select 
                        options={userSelectOptions}
                        defaultValue={userSelectOptions[0]}
                        className="w-full md:w-auto"
                        onChange={(e)=> {
                            // @ts-ignore
                            if(e?.value===''){
                                setColumnFilters([])
                            } else {
                            // @ts-ignore
                                onFilterChange('cargo_id',e?.value);
                            }
                            
                            
                        }}
                        />
  
                    </div>

                    <div className="md:mt-0 w-full md:w-auto mt-2 flex-wrap gap-2">
                    

                        <Button.Root 
                        onClick={() => navigate(REGISTER_CONSULTOR)}
                        className="bg-white border border-purple-solid-500 text-purple-solid-500 hover:bg-purple-solid-200 w-full">
                            <Button.Content content="Cadastrar um Usuário" />
                            <Button.Icon icon={FaPlus} />
                        </Button.Root>

                     </div>

            </div>


        </TableHeaderWrapper>

    );

}