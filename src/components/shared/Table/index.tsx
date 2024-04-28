import { Table as TB } from 'antd';
import { TableProps } from 'antd/lib';
import { CSSProperties } from 'react';
import './styles.css'

type TableConfig <T> = {

  data: T[],
  columns: TableProps<T>['columns']
  style?: CSSProperties,
  className?:string,

}

export const Table = ({data,columns,style,className}:TableConfig<any>) => {

    return (

        <TB
        className={className}
        style={style}
        columns={columns}
        dataSource={data}
        pagination={false} 
        
        />

    )

}