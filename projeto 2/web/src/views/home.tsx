import React,{useEffect, useState} from 'react'

import api from '../services/api'

interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
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
            <table>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Descrição</td>
                        <td>Preço</td>
                        <td>Quantidade em Estoque</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>{return(
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                    )})}
                </tbody>
            </table>
            
        </div>
    )
}