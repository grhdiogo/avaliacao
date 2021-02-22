import React from 'react'
import {Switch,Route} from 'react-router-dom'

import Home from '../views/home'
import createProduct from '../views/product/create'
import Purchase from '../views/product/purchase'

export default  function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/product/create" exact component={createProduct}></Route>
            <Route path="/product/active" exact component={Purchase}></Route>
        </Switch>
    )
}