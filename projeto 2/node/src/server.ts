import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import routes from './routes'
import Product from './model/Product'
import Sale from './model/Sale'
import Purchase from './model/Purchase'


const app = express()


declare module 'express-session' {
    interface SessionData {
        products:Product[]
        sales:Sale[]
        purchases:Purchase[]
    }
}// Defino as variáveis que serão utilizadas na sessão da api

app.use(express.json())//Defino a utilização de json nas requisições e respostas
app.use(cookieParser())//Defino utilização do cookiparser que serve para "traduzir" as informações recebidas e enviadas por cookies

app.use(express.static(path.join(__dirname,"../../web/build"))) // defino o diretório de onde foi contruído o fron end

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT"],
    credentials:true
})) // Permite que determinado caminho possa fazer requisições nesta api

app.use(session({
    secret:'avaliacao',
    resave:true,
    saveUninitialized:true,
}))//Utilizo sessão como uma forma de armazenar dados enquanto a aplicação estiver rodando

app.get('/', (req,res) => {
    const x = path.join(__dirname,'../../web/build/index.html')
    res.sendFile(x);

  }); // defino que na rota / no método get será mostrado o arquivo index.html

app.use(routes) // Defino a utilização da variável routes que faz referência ao arquivo routes que determina as rotas da api.

app.listen(3334) // Defino a porta que será rodado a api.