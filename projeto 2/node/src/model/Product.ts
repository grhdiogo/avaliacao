export default class Product{
    id
    name
    description
    price
    stock
    setName(name){
        this.name=name
    }
    setId(id){
        this.id=id
    }
    setDescription(description){
        this.description=description
    }
    setStock(stock){
        this.stock=stock
    }
    setPrice(price){
        this.price=price
    }

    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getDescription(){
        return this.description
    }
    getStock(){
        return this.stock
    }
    getPrice(){
        return this.price
    }

    setProduct(Product: Product){
        this.setName(Product.name)
        this.setId(Product.id)

        this.setDescription(Product.description)
        this.setStock(Product.stock)
    }
}