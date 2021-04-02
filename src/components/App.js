import React from 'react';
import {  Route,Router } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import ProductDetails from './ProductDetails';
import Products from './Products';
import Cart from './Cart';
import MyOrder from './MyOrder';

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                    <Header />
                    <Route path="/" exact component={Products} />
                    <Route path="/product" exact component={Products} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/products/:id" component={ProductDetails} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/myorder" component={MyOrder} />
            </div>
        );
    }
}
export default App;
