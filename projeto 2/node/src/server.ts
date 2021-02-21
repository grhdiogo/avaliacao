import express from 'express'
import productController from './controller/productController'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import Product from './model/Product'

const app = express()


declare module 'express-session' {
    interface SessionData {
        product:Product[]
    }
}

let teste = "teste"

app.set('teste', teste);

app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret:'avaliacao',
    resave:true,
    saveUninitialized:true,
}))
app.get("/",productController.createProduct)
app.get("/product/:id",productController.searchProduct)
app.get("/product/update/:id",productController.updateProduct)
app.get("/products",productController.searchAll)



app.listen(3334)