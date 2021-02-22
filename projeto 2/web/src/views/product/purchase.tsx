import React,{useState,FormEvent,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import api from '../../services/api'

interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    stock:number;
}

export default function Purchase(){
    const history = useHistory()

    const [name, setName] = useState('')
    const [products, setProducts] = useState<Product[]>([])

    const [method, setMethod] = useState('sell')
    const [date, setDate] = useState('')
    const [productID, setProductID] = useState('')
    const [priceStr, setPrice] = useState('')
    const [quantityStr, setQuantity] = useState('')

    useEffect(()=>{
        api.get('products').then(res=>{
            setProducts(res.data)
        })
    },[])

    async function submit(event: FormEvent){
        event.preventDefault()

        if(name === "Produto Não encontrado"){
            alert("Produto não encontrado")
        }else if(productID === "" || date === "" || quantityStr === "" || priceStr === ""){
            alert("Todos os campos são obrigatórios")
        }else{
            const price = parseInt(priceStr)
            const quantity = parseInt(quantityStr)
            const data = {productID,date,price,quantity}
            const dataString = JSON.stringify(data)
            const jsonData = JSON.parse(dataString)
            
            if(method === "sell"){
                const id = parseInt(productID)
                const quant = parseInt(quantityStr)

                await api.post('verify',{id:id,quant:quant}).then((e)=>{
                    if(e.data === true){
                        api.post('sale',jsonData)
                    }else{
                        alert("Esse produto não tem estoque ")
                    }
                })
            }else{
                await api.post('purchase',jsonData)
            }

            history.push("/")
        }
        
        console.log(name)
        

    }

    function changeProduct(e){
        if(e != null){
            setName("Produto Não encontrado")
            products.forEach(product=>{
                if(product.id == e.target.value){
                    setName(product.name)
                    setProductID(e.target.value)
                }
            })
        }
    }
    return(
        <div>
            <label>Médodo:</label>
            <select onChange={event => setMethod(event.target.value)}>
                <option value="sell">Vender</option>
                <option value="buy">Comprar</option>
            </select>
            <br/>
            <label>Código do produto</label><input id="id" onChange={changeProduct}/><br/>
            <label id="name">{'Produto: '+name}</label><br/>

            <label>Data</label><input id="name" type="date" value={date} onChange={event => setDate(event.target.value)}/><br/>
            <label>Quantidade</label><input id="description" type="number" value={quantityStr} onChange={event => setQuantity(event.target.value)}/><br/>
            <label>Preço</label><input id="price" type="number" required  min="0" step=".01" value={priceStr} onChange={event => setPrice(event.target.value)}/><br/>
            <input type="submit" value="Enviar" onClick={submit}/>
        </div>
    )
}