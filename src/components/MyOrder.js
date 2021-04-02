import React from 'react';
import { connect } from 'react-redux';
import { fetchOrderItems } from '../actions'
import '../css/myOrder.css';
import history from './history';

class MyOrder extends React.Component {
    componentDidMount() {
        this.props.fetchOrderItems();
    }
    goToItem = (item) => {
        //  console.log(" item.id = " + item.id + "products = " + this.props.products);
        let it = this.props.products.filter(prod => prod['productName'] === item.productName)
        history.push(`/products/${it[0].id}`);
    }
    render() {
        let includesUserId
        if (this.props.orders.some(ord => ord.user === this.props.loggedInUser?.userId)) {
            includesUserId = false
        } else {
            includesUserId = true
        }
            if (this.props.loggedInUser != null && includesUserId)
                return (<div>Please Checkout FOOD..............</div>);
            else if (this.props.loggedInUser != null) {
                return this.props.orders.map((order) => {
                    if (this.props.loggedInUser.userId === order.user)
                        return (
                            <div key={order.id} class="ui card" style={{ float: 'left', maxWidth: '25%' }} onClick={() => this.goToItem(order)}>
                                <div class="content" >
                                    <div class="header">
                                        {order.productName}
                                    </div>
                                    <div class="right" style={{ color: 'green' }}>
                                        REFID = {order.refId}
                                    </div>
                                </div>
                                <div class="content">
                                    <div class="header" >
                                        <img
                                            src={order.src}
                                            class="card-img-top"
                                            alt="..."
                                        />
                                    </div>
                                    <div class="description" style={{ fontWeight: 'normal', fontWeight: 'bold', fontSize: '50px' }}>
                                        <p> {`${order.productPrice}` * `${order.quantity}`}/-</p>
                                    </div>
                                    <div class="description" style={{ float: 'right', marginLeft: '140px', textAlign: 'right' }}>
                                        <p> PRICE = {order.productPrice}/- Each</p>
                                        <p> Quantity = {order.quantity}</p>
                                    </div>

                                </div>
                                <div class="content" >
                                    <div class="footer" style={{ float: 'left' }}>
                                        <p style={{ color: 'green' }}> ORDER TIME - {order.timeStamp}</p>
                                    </div>
                                </div>
                            </div>
                        );
                })
            }
            else {
                return (<div>Please Login To See The Ordered Items</div>);
            }
        }
    }
    const mapStateToProps = (state) => {
        return {
            loggedInUser: state.loggedInUserState.loggedInUser.user,
            products: state.productsState.myProducts.products,
            orders: state.productsState.myOrders.orders
        };
    }
    export default connect(mapStateToProps, { fetchOrderItems })(MyOrder);