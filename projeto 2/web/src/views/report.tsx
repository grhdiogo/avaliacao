import React,{useEffect, useState} from 'react'

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
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Quantidade de produtos comprados</td>
                        <td>Quantidade de compras</td>
                        <td>Valor total das compras</td>
                        <td>Quantidade de produtos vendidos</td>
                        <td>Quantidade de vendas</td>
                        <td>Valor total das vendas</td>
                        <td>Estoque</td>
                        <td>Lucro</td>
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
            </table>
        </div>
    )
}