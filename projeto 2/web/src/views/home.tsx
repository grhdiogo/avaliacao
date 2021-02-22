import React,{useEffect, useState} from 'react'
import { Table } from 'reactstrap';

import api from '../services/api'

interface Product{
    id:number;
    name:string;
    description:string;
    stock:number;
}

export default function Home(){
    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=>{
        api.get('products').then(res=>{
            setProducts(res.data)
        })
    },[])

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Quantidade em Estoque</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>{return(
                        <th key={product.id} scope="row">
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.stock}</td>
                        </th>
                    )})}
                </tbody>
            </Table>
        </div>
    )
}