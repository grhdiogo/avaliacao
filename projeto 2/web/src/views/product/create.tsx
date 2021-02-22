import React,{useState,FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import api from '../../services/api'

export default function Create(){
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)

    async function submit(event: FormEvent){
        event.preventDefault()

        const data = {name,description,price,stock}
        const dataString = JSON.stringify(data)
        const jsonData = JSON.parse(dataString)
        await api.post('product/create',jsonData)

        history.push("/")

    }
    return(
        <div>
            <label>Nome</label><input id="name" value={name} onChange={event => setName(event.target.value)}/><br/>
            <label>Descrição</label><input id="description" value={description} onChange={event => setDescription(event.target.value)}/><br/>
            <label>Preço</label><input id="price" type="number" required  min="0" step=".01" value={price} onChange={event => setPrice(event.target.value)}/><br/>
            <input type="submit" value="Enviar" onClick={submit}/>
        </div>
    )
}