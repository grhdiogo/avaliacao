import {Router} from 'express'
import ProductController from './controller/productController'

const routes =  Router() // Crio uma variável routes do tipo router para controlar as rotas da api

routes.post("/product/create",ProductController.createProduct)
routes.get("/product/:id",ProductController.searchProduct)
routes.put("/product/update",ProductController.updateProduct)
routes.get("/products",ProductController.searchAll)

routes.post("/sale",ProductController.sellProduct)
routes.post("/verify",ProductController.vrfStock)

routes.post("/purchase",ProductController.buyProduct)

routes.get("/report",ProductController.report)

//Crio uma rota com determinado caminho e método e chama determinada função do controller

export default routes // exporto a variável routes

