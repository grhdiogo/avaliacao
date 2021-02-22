import React,{useState,FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import api from '../../services/api'

export default function Create(){
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const stock = 0

    async function submit(event: FormEvent){
        event.preventDefault()

        const data = {name,description,stock}
        const dataString = JSON.stringify(data)
        const jsonData = JSON.parse(dataString)
        await api.post('product/create',jsonData)

        history.push("/")

    }
    return(
        <div>
            <label>Nome</label><input id="name" value={name} onChange={event => setName(event.target.value)}/><br/>
            <label>Descrição</label><input id="description" value={description} onChange={event => setDescription(event.target.value)}/><br/>
            <input type="submit" value="Enviar" onClick={submit}/>
        </div>
    )
}