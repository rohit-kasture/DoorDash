import React from 'react';
import { connect } from 'react-redux';
import { getAllProduct, addToCart } from '../actions';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Products extends React.Component {
    componentDidMount() {
        this.props.getAllProduct();
         }
    addToCart = (p) => {
        /*  
         console.log(p.product.id);
         console.log(JSON.stringify(p))
          */
        let quantity = document.getElementById(("quantity" + p.product.id)).value;
        if (quantity == '') {
            quantity = 1;
        }
        this.props.addToCart(p.product, quantity, this.props.loggedInUser.userId);
    }
    renderList() {
        return this.props.products.map(product => {
            return (
                <div class="card" style={{ width: '30.8%', height: 420, float: 'left', padding: '30px' }} key={product.id}>
                    <div style={{ float: 'left', fontWeight: "bold" }} class="card-title">{product.productName}</div>
                    <img
                        src={product.src}
                        class="card-img-top"
                        alt="..."
                        style={{ width: 260, height: 260 }}
                    />
                    <div>
                        <div style={{ marginLeft: '  200px', fontWeight: "bold" }} class="card-title">Prize = {product.productPrice}/-</div>
                    </div>
                    <div class="card-body" style={{
                        visibility: this.props.loggedInUser != null ?
                            'visible' : 'hidden'
                    }}>

                        <div><input id={`quantity${product.id}`} type="number" min="1" max="110" placeholder="quantity" /></div>
                        <div onClick={() => this.addToCart({ product })}> <Link to="#">Add To Cart</Link></div>
                        <Link to={`/products/${product.id}`}>View More</Link>
                    </div> </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderList()}
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.productsState.myProducts.products,
        loggedInUser: state.loggedInUserState.loggedInUser.user,
        selectedProduct: state.selectedProduct
    };
}

export default connect(mapStateToProps,
    { getAllProduct, addToCart })(Products);