export default class Sell{
    id
    date
    productID
    quantity
    total

    getID(){
        return this.id
    }
    getDate(){
        return this.date

    }
    getProductID(){
        return this.productID

    }
    getQuantity(){
        return this.quantity

    }
    getTotal(){
        return this.total
    }

    setID(id){
        this.id=id
    }
    setProductID(productID){
        this.productID=productID
    }
    setQuantity(quantity){
        this.quantity=quantity
    }
    setTotal(total){
        this.total=total
    }
    setDate(date){
        this.date=date
    }
}//Criação da classe de vendas com getters e setters