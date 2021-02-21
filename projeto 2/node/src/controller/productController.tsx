import {Request, Response} from 'express'
import Product from '../model/Product'

export default{
    createProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.product || [] //Ou inicia vazio ou atribui o valor
        product.setId(products.length+1)
        product.setName("Nome")
        product.setStock("0")
        product.setDescription("Descrição")
        
       
        
        products.push(product)
        sess.product=products
        console.log(req.session.product)
        res.json({"message":"Produto cadastrado"})
    },

    searchProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.product || []
        const {id} = req.params

        if(products.length==0){
            res.json({"message":"Não Há produtos a serem listados"})
        }else{
            for (let index = 0; index < products.length; index++) {
                if(id==products[index].id){
                    product.setProduct(products[index])
                }
            }
                res.json(product)
            
        }

    },

    updateProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.product || []
        const {id} = req.params
        product.setId(id)
        product.setName("Nome Alterado")
        product.setStock("0")
        product.setDescription("Descrição Alterada")

        if(products.length==0){
            res.json({"message":"Não Há produtos cadastrados."})
        }else{
            for (let index = 0; index < products.length; index++) {
                if(id==products[index].id){
                    products[index]=product
                }
            }
                res.json(product)
        }

    },

    searchAll(req: Request, res: Response){
        const sess = req.session
        const products = sess.product || []
        res.json(products)
    }
}