import express from 'express'
import routes from './routes'
import session from 'express-session'
import cookieParser from 'cookie-parser'
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
}

app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret:'avaliacao',
    resave:true,
    saveUninitialized:true,
}))

app.use(routes)

app.listen(3334)