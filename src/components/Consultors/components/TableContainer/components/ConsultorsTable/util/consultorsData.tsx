import React from "react";
import { StatusType } from "./@types/StatusType";




export type DataType = {

    key: string,
    tops: string,
    names: string,
    email: string;
    phone: string;
    totalFatured: number;
    status: StatusType;
    actions: React.ReactNode;

}


export const consultorsData:DataType [] = [

    {
        
        key: '1',
        tops: '1',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 100000,
        status: 'Ativo',
        actions: <></>,

    },
    {

        key: '2',
        tops: '2',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Inativo',
        actions: <></>,

    },
    {

        key: '3',
        tops: '3',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Ativo',
        actions: <></>,

    },
    {

        key: '4',
        tops: '4',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Em aprovação',
        actions: <></>,

    },
    {

        key: '5',
        tops: '5',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Inativo',
        actions: <></>,

    },
    {

        key: '6',
        tops: '6',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Ativo',
        actions: <></>,

    },
    {

        key: '7',
        tops: '7',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Em aprovação',
        actions: <></>,

    },
    {

        key: '8',
        tops: '8',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Inativo',
        actions: <></>,

    },
    {

        key: '9',
        tops: '9',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Ativo',
        actions: <></>,

    },
    {

        key: '10',
        tops: '10',
        names: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'Ativo',
        actions: <></>,

    },

];

