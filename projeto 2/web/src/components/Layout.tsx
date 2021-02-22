import {Link} from 'react-router-dom'

import Routes from '../routes/routes'

import '../styles/layout.css'

export default function Layout(){
    return(
        <div className="layoutContainer">
            <div className="menuBar">
                <Link className="menuBarLink" to="/">Listar Produtos</Link>
                <Link className="menuBarLink"  to="/product/create">Criar Produto</Link>
                <Link className="menuBarLink"  to="/product/active">Comprar ou vender Produto</Link>
                <Link className="menuBarLink"  to="/report">Relatório</Link>
            </div>
            <div className="content">
                <Routes/>
            </div>
        </div>
    )
}