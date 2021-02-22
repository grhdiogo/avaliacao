import {Request, Response} from 'express'
import * as yup from 'yup';

import Product from '../model/Product'
import Sale from '../model/Sale'
import Purchase from '../model/Purchase'


function productExist(req: Request, res: Response,id){
    const sess = req.session
    const products = sess.products || []
    for (let index = 0; index < products.length; index++) {
        if(id==products[index].id){
            return true
        }
    }
    return false

}
function verifyStock(req: Request, res: Response,id,quant){
    const sess = req.session
    const products = sess.products || []

    for (let index = 0; index < products.length; index++) {
        if(id==products[index].id){
            if(products[index].stock >= quant){
                return true
            }else{
                return false
            }
        }
    }

}
function updateStock(req: Request, res: Response,id,quant,method){
    const sess = req.session
    const products = sess.products || []
    for (let index = 0; index < products.length; index++) {
        if(id==products[index].id){
           if(method=="buy"){
               products[index].stock = products[index].stock + quant
           }else if(method == "sell"){
            products[index].stock = products[index].stock - quant
           }
        }
    }
}


export default{
    createProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.products || [] //Ou inicia vazio ou atribui o valor
        const{
            name,
            stock,
            price,
            description,
        } = req.body

        let schema = yup.object().shape({
            name: yup.string().required(),
            stock:yup.number().required(),
            description:yup.string().required(),
            price:yup.number().required(),
        })

        schema.validate({
            name:name,
            stock:stock,
            description:description,
            price:price
        }).then(()=>{
            product.setId(products.length+1)
            product.setName(name)
            product.setStock(stock)
            product.setDescription(description)
            product.setPrice(price)

            products.push(product)
            sess.products=products
            res.json({"message":"Produto cadastrado"})
        }).catch((err)=>{
            res.json(err.message)
        })//verifica existência e tipo dos dados 
    },

    searchProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.products || []
        const {id} = req.params

        if (productExist(req,res,id)){
            for (let index = 0; index < products.length; index++) {
                if(id==products[index].id){
                    product.setProduct(products[index])
                }
            }
                res.json(product)
        }else{
            res.json({"message":"Não Há produtos a serem listados"})
        }


    },

    updateProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.products || []
        const{
            id,
            name,
            stock,
            price,
            description,
        } = req.body

        product.setId(id)
        product.setName(name)
        product.setStock(stock)
        product.setPrice(price)
        product.setDescription(description)

        let schema = yup.object().shape({
            id:yup.number().required(),
            name: yup.string().required(),
            stock:yup.number().required(),
            description:yup.string().required(),
            price:yup.number().required(),
        })
        schema.validate({
            id:id,
            name:name,
            stock:stock,
            description:description,
            price:price
        }).then(()=>{
            if (productExist(req,res,id)){
                for (let index = 0; index < products.length; index++) {
                    if(id==products[index].id){
                        products[index]=product
                    }
                }
                    res.json(product)
            }else{
                res.json({"message":"Produto não cadastrado"})
            }
        }).catch((err)=>{
            res.json(err.message)
        })

        


    },

    searchAll(req: Request, res: Response){
        const sess = req.session
        const products = sess.products || []
        res.json(products)
    },

    sellProduct(req: Request, res: Response){
        const{
            date,
            productID,
            price,
            quantity,
        } = req.body
        const sess = req.session
        const sales = sess.sales || [] //Ou inicia vazio ou atribui o valor
        const sale = new Sale

        let schema = yup.object().shape({
            date: yup.string().required(),
            productID:yup.number().required(),
            price:yup.number().required(),
            quantity:yup.number().required(),
        })
        schema.validate({
            date:date,
            productID:productID,
            price:price,
            quantity:quantity
        }).then(()=>{
            if (productExist(req,res,productID)){
                console.log(quantity)
                if(verifyStock(req,res,productID,quantity)){
                    updateStock(req,res,productID,quantity,"sell")
                    sale.setID(sales.length+1)
                    sale.setDate(date)
                    sale.setProductID(productID)
                    sale.setQuantity(quantity)
                    sale.setTotal(price*quantity)
    
                    sales.push(sale)
                    sess.sales = sales
                    res.json(sales)
                }else{
                    res.json({"message":"Não há produtos suficientes"})
                }
                
            }else{
                res.json({"message":"ID do produto inválido"})
            }
        }).catch((err)=>{
            res.json(err.message)
        })


        
    },

    buyProduct(req: Request, res: Response){
        const{
            date,
            productID,
            price,
            quantity,
        } = req.body
        const sess = req.session
        const purchases = sess.purchases || [] //Ou inicia vazio ou atribui o valor
        const purchase = new Purchase

        let schema = yup.object().shape({
            date: yup.string().required(),
            productID:yup.number().required(),
            price:yup.number().required(),
            quantity:yup.number().required(),
        })
        schema.validate({
            date:date,
            productID:productID,
            price:price,
            quantity:quantity
        }).then(()=>{
            if (productExist(req,res,productID)){
                purchase.setID(purchases.length+1)
                purchase.setDate(date)
                purchase.setProductID(productID)
                purchase.setQuantity(quantity)
                purchase.setTotal(price*quantity)
                updateStock(req,res,productID,quantity,"buy")
    
                purchases.push(purchase)
                sess.purchases = purchases
                res.json(purchases)
            }else{
                res.json({"message":"ID do produto inválido"})
            }
        }).catch((err)=>{
            res.json(err.message)
        })


        
    },

    report(req: Request, res: Response){
        const sess = req.session
        const products = sess.products || []
        const sales = sess.sales || []
        const purchases = sess.purchases || []

        let totalOfPurchases = 0
        let quantOfPurchases = 0
        let qtnOfPrdtPurchased = 0

        let totalOfSales = 0
        let quantOfSales = 0
        let qtnOfPrdtSold = 0

        let report:Array<Object> = []; //Criou array de objeto e inicio o array

        for (let indexProduct = 0; indexProduct < products.length; indexProduct++) {

            for (let index = 0; index < sales.length; index++) {
                if(sales[index].productID == products[indexProduct].id){
                    totalOfSales = totalOfSales + sales[index].total
                    qtnOfPrdtSold = qtnOfPrdtSold + sales[index].quantity
                    quantOfSales ++
                }
            }
            for (let index = 0; index < purchases.length; index++) {
                if(purchases[index].productID == products[indexProduct].id){
                    totalOfPurchases = totalOfPurchases + purchases[index].total
                    qtnOfPrdtPurchased = qtnOfPrdtPurchased + purchases[index].quantity
                    quantOfPurchases ++
                }
            }

            report.push({
                "Id":products[indexProduct].id,
                "Name":products[indexProduct].name,
                "QtnOfPrdtsPurchased":qtnOfPrdtPurchased,
                "QuantOfPurchases":quantOfPurchases,
                "TotalOfPurchases":totalOfPurchases,
                "QtnOfPrdtsSold":qtnOfPrdtSold,
                "QuantOfSales":quantOfSales,
                "TotalOfSales":totalOfSales,
                "Stock":products[indexProduct].stock,
                "Profit": totalOfSales - totalOfPurchases
            })
            totalOfPurchases = 0
            quantOfPurchases = 0
            qtnOfPrdtPurchased = 0

            totalOfSales = 0
            quantOfSales = 0
            qtnOfPrdtSold =0 

        }
        res.json(report)

    },

    vrfStock(req: Request, res: Response){
        const sess = req.session
        const products = sess.products || []

        const{
            id,
            quant,
        } = req.body

        for (let index = 0; index < products.length; index++) {
            if(id==products[index].id){
                if(products[index].stock >= quant){
                    res.json(true)
                }else{
                    res.json(false)
                }
            }
        }
        
    }


    
    




}