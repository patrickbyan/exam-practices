import react from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Register from './Pages/Register'
import Login from './Pages/Login'
import LandingPage from './Pages/LandingPage'
import DetailProducts from './Pages/DetailProducts'
import Navbar from './Components/Navbar'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import TransactionHistory from './Pages/TransactionHistory'

export default class App extends react.Component{
  render(){
    return (
      <div className="bg-dark text-light h-100">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/Register' component={Register} />
            <Route path='/Login' component={Login} />
            <Route path='/DetailProducts' component={DetailProducts} />
            <Route path='/Cart' component={Cart} />
            <Route path='/Checkout' component={Checkout} />
            <Route path='/transaction-history' component={TransactionHistory} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
