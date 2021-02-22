import {Request, Response} from 'express'
import * as yup from 'yup';

import Product from '../model/Product'
import Sale from '../model/Sale'
import Purchase from '../model/Purchase'


function productExist(req: Request, res: Response,id){
    const sess = req.session
    const products = sess.products || [] // Criar variável que receve a variável produtos da sessão, e se não foi inicializada , é inicialidada.
    for (let index = 0; index < products.length; index++) { 
        if(id==products[index].id){
            return true
        }
    }
    return false
}// Verifica a existência de produtos dentro do array producs da da sessão, e retornando verdadeiro ou falso


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
    }// Recebe id do produto e quantidade desejada, e verifica se a quantidade desse produto está disponível, retornando verdadeiro caso a quantidade seja maior ou igual a desejada ou falso caso não tenha.

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
}/* Recebe id do produto, quantidade e método, alterando o estoque do produto dependendo do método, sendo possível "sell" para venda e "buy" para compra do produto */


export default{
    createProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.products || [] //Ou inicia vazio ou atribui o valor
        const{
            name,
            stock,
            description,
        } = req.body //recebe os dados da requisição 

        let schema = yup.object().shape({
            name: yup.string().required(),
            stock:yup.number().required(),
            description:yup.string().required(),
        }) /// cria um esqueleto do esquema para verificar o tipo e exitência da variável

        schema.validate({
            name:name,
            stock:stock,
            description:description,
        }).then(()=>{
            product.setId(products.length+1) // Pega o valor da variável dos produtos e atribui +1, funcionando como auto increment
            product.setName(name)
            product.setStock(stock)
            product.setDescription(description)

            products.push(product)
            sess.products=products
            res.json({"message":"Produto cadastrado"})
        }).catch((err)=>{
            res.json(err.message)
        })//verifica existência e tipo dos dados e caso esteja tudo certo, atribui a váriavel product do tipo Product os dados e salva na sessão, caso não, retorna um de erro.
    },

    searchProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.products || []
        const {id} = req.params // Atribui a variável id o valor do parametro id do get.

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


    },//Procura um produto e retorna o mesmo se existir, caso não existe retorna uma mensagem.

    updateProduct(req: Request, res: Response){
        const sess = req.session
        const product = new Product
        const products = sess.products || []
        const{
            id,
            name,
            stock,
            description,
        } = req.body

        product.setId(id)
        product.setName(name)
        product.setStock(stock)
        product.setDescription(description)

        let schema = yup.object().shape({
            id:yup.number().required(),
            name: yup.string().required(),
            stock:yup.number().required(),
            description:yup.string().required(),
        })
        schema.validate({
            id:id,
            name:name,
            stock:stock,
            description:description,
        }).then(()=>{
            if (productExist(req,res,id)){ // Verifica se o produto com determinado ID existe
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

        


    },// Recebe os paramêtros e atribui às variáveis, faz a autenticação dos dados para atualizar dados do usuário, e se existir algum erro ele retorna.

    searchAll(req: Request, res: Response){
        const sess = req.session
        const products = sess.products || []
        res.json(products)
    },// Retorna todos produtos cadastrados

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
            if (productExist(req,res,productID)){ // Verifica existência do produto
                console.log(quantity)
                if(verifyStock(req,res,productID,quantity)){ // Verifica se a quantidade para venda do produto existe em estoque
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


        
    },//Faz a venda de um produto e registra os dados na variável de venda e atualiza o estoque na variável de produtos

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
            if (productExist(req,res,productID)){ // verifica existência do produto
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


        
    },//Faz a compra de um produto e registra os dados na variável de compra e atualiza o estoque na variável de produtos

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
        let qtnOfPrdtSold = 0 // cria as variáveis do objeto

        let report:Array<Object> = []; //Criou array de objeto e inicio o array

        for (let indexProduct = 0; indexProduct < products.length; indexProduct++) {

            for (let index = 0; index < sales.length; index++) {
                if(sales[index].productID == products[indexProduct].id){
                    totalOfSales = totalOfSales + sales[index].total
                    qtnOfPrdtSold = qtnOfPrdtSold + sales[index].quantity
                    quantOfSales ++
                }
            }// Percore array de vendas, atribuindo os valores determinados por produto
            for (let index = 0; index < purchases.length; index++) {
                if(purchases[index].productID == products[indexProduct].id){
                    totalOfPurchases = totalOfPurchases + purchases[index].total
                    qtnOfPrdtPurchased = qtnOfPrdtPurchased + purchases[index].quantity
                    quantOfPurchases ++
                }
            }// Percore array de compras, atribuindo os valores determinados por produto

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
            })// Adiciono no array o objeto com as informações de cada produto
            totalOfPurchases = 0
            quantOfPurchases = 0
            qtnOfPrdtPurchased = 0

            totalOfSales = 0
            quantOfSales = 0
            qtnOfPrdtSold =0 
            // zero as variáveis para serem reutilizadas dentro do for
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
        
    }// Recebo id e quantidade e verifico se determinado produto tem aquela quantidade em estoque disponível


    
    




}