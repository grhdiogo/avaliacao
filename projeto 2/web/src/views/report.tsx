import React,{useEffect, useState} from 'react'
import { Table } from 'reactstrap';

import api from '../services/api'

interface Report{
    Id:number;
    Name:string;
    QtnOfPrdtsPurchased:number;
    QuantOfPurchases:number;
    TotalOfPurchases:number;
    QtnOfPrdtsSold:number;
    QuantOfSales:number;
    TotalOfSales:number;
    Stock:number;
    Profit:number
}


export default function Report(){
    const [reports, setReports] = useState<Report[]>([])

    useEffect(()=>{
        api.get('report').then(res=>{
            setReports(res.data)
        })
    },[])

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Quantidade de produtos comprados</th>
                        <th>Quantidade de compras</th>
                        <th>Valor total das compras</th>
                        <th>Quantidade de produtos vendidos</th>
                        <th>Quantidade de vendas</th>
                        <th>Valor total das vendas</th>
                        <th>Estoque</th>
                        <th>Lucro</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report=>{return(
                        <tr key={report.Id}>
                            <td>{report.Id}</td>
                            <td>{report.Name}</td>
                            <td>{report.QtnOfPrdtsPurchased}</td>
                            <td>{report.QuantOfPurchases}</td>
                            <td>{report.TotalOfPurchases}</td>
                            <td>{report.QtnOfPrdtsSold}</td>
                            <td>{report.QuantOfSales}</td>
                            <td>{report.TotalOfSales}</td>
                            <td>{report.Stock}</td>
                            <td>{report.Profit}</td>
                        </tr>
                    )})}
                </tbody>
            </Table>
        </div>
    )
}