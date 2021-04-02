import React from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, postCartItemsToMyOrders, deleteItemFromCart } from "../actions";
import { Link } from 'react-router-dom';
import { Button, Icon, Table } from 'semantic-ui-react'
import history from './history';

class Cart extends React.Component {
    componentDidMount() {
        this.props.fetchCartItems();
    }
    renderTotalPrice = () => {
        let total = 0;
        this.props.productsInMyCart.map((prod) => {
            total += `${prod.productPrice}` * `${prod.quantity}`
        })
        return <div>{total}/-</div>;
    }
    onCheckout = () => {
        let cart = this.props.productsInMyCart.filter(cartItem => cartItem.user === this.props.loggedInUser.userId)
        this.props.postCartItemsToMyOrders(cart);
    }
    removeItem = (id) => {
        this.props.deleteItemFromCart(id);
        history.push('/product');

    }
    renderBody = () => {
        return this.props.productsInMyCart.map((prod) => {
            if (this.props.loggedInUser.userId === prod.user)
                return (
                    <tbody key={prod.id}>
                        <tr>
                            <td data-label="Name">
                                <Link to={`/products/${prod.id}`}>
                                    <img
                                        src={prod.src}
                                        class="card-img-top"
                                        alt="..."
                                        style={{ width: 80, height: 80 }}
                                    />
                                </Link>
                            </td>
                            <td data-label="prodName">{prod.productName}</td>
                            <td data-label="quantity">{prod.quantity}</td>
                            <td data-label="prodPrice">{prod.productPrice}/-</td>
                            <td data-label="total">{`${prod.productPrice}` * `${prod.quantity}`}/-</td>
                            <td>
                                <Button onClick={() => this.removeItem(`${prod.id}`)}> <Icon name='remove' />Remove Items</Button>
                            </td>

                        </tr>
                    </tbody>);
        })
    }
    render() {
        if (this.props.loggedInUser != null) {
            return (
                <table class="ui celled table">
                    <thead>
                        <tr><th>Item</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Product Price</th>
                            <th colSpan='3'>Total Price</th>
                        </tr></thead>
                    {this.renderBody()}
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell >
                                <Icon name='plus square' /> <Link to="/product">Add More Items</Link>
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan='3'>
                                <Button size='small' onClick={() => this.onCheckout()}>CheckOut</Button>
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>
                                <label
                                    floated='right'
                                    labelPosition='left'
                                    primary
                                    size='small'
                                >
                                    {this.renderTotalPrice()}
                                </label>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </table>
            );
        }
        else
            return (<div>Please Login To Order The Food.</div>);
    }
}
const mapStateToProps = (state) => {
   // console.log("state = " + JSON.stringify(state));
   console.log("state = " + state.user);
   const {cart} = state.productsState.myCart;
    return {
        productsInMyCart: cart,
        loggedInUser: state.loggedInUserState.loggedInUser.user
    };
}
export default connect(mapStateToProps, { fetchCartItems, postCartItemsToMyOrders, deleteItemFromCart })(Cart);