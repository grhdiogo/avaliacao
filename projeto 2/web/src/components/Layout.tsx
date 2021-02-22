import {Link} from 'react-router-dom'

import Routes from '../routes/routes'

export default function Layout(){
    return(
        <div>
            <div className="menuBar">
                <Link to="/">Listar Produtos</Link>
                |
                <Link to="/product/create">Criar Produto</Link>
                |
                <Link to="/product/active">Comprar ou vender Produto</Link>
                |
                <Link to="/report">Relatório</Link>
            </div>
            <div className="content">
                <Routes/>
            </div>
        </div>
    )
}