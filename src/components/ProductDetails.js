import React from 'react';
import { connect } from 'react-redux';
import { selectedProduct, addToCart } from '../actions';
import { Card } from 'react-bootstrap'

class ProductDetails extends React.Component {
    componentDidMount() {
        this.props.selectedProduct(this.props.match.params.id);
    }
    addToCart = () => {
        let quantity = document.getElementById("quantity").value;
        if (quantity == undefined) {
            console.log(quantity);
            quantity = 1;
        }
        this.props.addToCart(this.props.product, quantity, this.props.loggedInUser.userId);
    }
    render() {
        return (
            <div>
                <div class="card" style={{ width: '30.8%', height: 420, float: 'left', padding: '30px' }}  >
                    <img
                        src={this.props.product.src}
                        class="card-img-top"
                        alt="..."
                        style={{ width: 260, height: 260 }}
                    />
                    <div>
                        <div style={{ float: 'left', fontWeight: "bold" }} class="card-title">{this.props.product.productName}</div>
                        <div style={{ marginLeft: '  200px', fontWeight: "bold" }} class="card-title">{this.props.product.productPrice}/-</div>
                    </div>
                    <div class="card-body" style={{
                        visibility: this.props.loggedInUser != null ?
                            'visible' : 'hidden'
                    }}>
                        <input id="quantity" type="number" min="1" max="110" placeholder="quantity" />
                        <div onClick={() => this.addToCart()}> <Card.Link href="#">Add To Cart</Card.Link></div>
                    </div>
                </div>
            </div>);
    }
}
const mapStateToProps = (state) => {
    return { product: state.selectedProduct, loggedInUser: state.loggedInUserState.loggedInUser.user };
}

export default connect(mapStateToProps, { selectedProduct, addToCart })(ProductDetails);