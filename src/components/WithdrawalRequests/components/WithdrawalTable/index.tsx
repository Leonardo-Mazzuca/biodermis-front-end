

import { TableWrapper } from "../../../shared/Table/components/TableWrapper"
import { TableHeader } from "../TableHeader"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData"
import { Pagination } from "../../../shared/Pagination"
import { TableSorters } from "../../../shared/Table/components/TableSorters"
import { Spinner } from "../../../shared/Spinner"
import { Empty } from "antd"
import { useEmptiness } from "../../../../hooks/useEmptiness/useEmptiness"


export const WithdrawalTable = () => {

 
    const {
        columnFilters,
        data, 
        columns, 
        setColumnFilters, 
        sorting, 
        setSorting,
        isLoading
    
    } = useTableData();

    


    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting: sorting
        },
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
      
    });


    const {isEmpty} = useEmptiness({table,isLoading,columnFilters,data});

    return (

        <TableWrapper>

            {isLoading ?
            
                <Spinner /> :

                (
                <>


                    {isEmpty ? 
                    
            
                    <>

                        <TableHeader 
                        columnsFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        />

                        <Empty
                            description={"Nenhum pedido de saque foi encontrado"}
                        
                        />

                    </>


                    : (

                        <>

                        <TableHeader 
                        columnsFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        />

                        <C.Container >

                        <C.Table style={{minWidth: '800px'}}>
                        <C.Thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <C.EvenRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header)=> (
                                        

                                        <TableSorters header={header} />
                                    
                                    ))}
                                </C.EvenRow>
                            ))}
                        </C.Thead >

                        <tbody>
                            {table.getRowModel().rows.map((row)=> (
                                <C.HoverRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <C.Td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell,
                                                cell.getContext())}
                                        </C.Td>
                                    ))}
                                </C.HoverRow>
                            ))}
                        </tbody>
                        </C.Table>

                        </C.Container>

                        <Pagination table={table} />
                        </>

                    )
                                    
                
                    }
                    
                
                    </>
                )
        
            }


            
        </TableWrapper>


    );


}