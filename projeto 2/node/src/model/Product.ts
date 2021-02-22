export default class Product{
    id
    name
    description
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
    } // Crio os métodos "Set" de cada atributo

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
    } // Crio os métodos "Get" de cada atributo

    setProduct(Product: Product){
        this.setName(Product.name)
        this.setId(Product.id)

        this.setDescription(Product.description)
        this.setStock(Product.stock)
    }// Função onde recebe um produto e atribui os valores dele às variaveis correspondentes.
}