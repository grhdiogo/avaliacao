import React,{useState,FormEvent} from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
            <Form>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input id="name" value={name} onChange={event => setName(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Descrição</Label>
                    <Input id="description" value={description} onChange={event => setDescription(event.target.value)}/>
                </FormGroup>
                <Button onClick={submit}>Enviar</Button>
            </Form>
        </div>
    )
}