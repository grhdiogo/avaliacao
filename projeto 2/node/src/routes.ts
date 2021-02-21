import {Router} from 'express'
import ProductController from './controller/productController'

const routes =  Router()

routes.post("/product/create",ProductController.createProduct)
routes.get("/product/:id",ProductController.searchProduct)
routes.put("/product/update",ProductController.updateProduct)
routes.get("/products",ProductController.searchAll)

routes.post("/sale",ProductController.sellProduct)

routes.post("/purchase",ProductController.buyProduct)

routes.get("/report",ProductController.report)


export default routes

