import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/product" className="item">Menu</Link>
            <Link to="/register" className="item">Register</Link>
            <Link to="/cart" className="item"> Cart </Link>
            <Link to="/myorder" className="item">MyOrders</Link>
            <div id="user" style={{ float: 'right', textAlign: 'right', marginLeft: '540px' }}>
                <Link to="/login" className="item">Login</Link>
            </div>
        </div>
    );
};

export default Header;