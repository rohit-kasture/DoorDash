const INITIAL_STATE = {
    myCart: { cart: [] },
    myOrders: { orders: [] },
    myProducts: { products: []},
    myUsers: { users: [] },
    loggedInUser: { user: null }
};

const reducer = (state = INITIAL_STATE, action) => {
    const { cart } = INITIAL_STATE.myCart;
    const { orders } = INITIAL_STATE.myOrders;
    const { users } = INITIAL_STATE.myUsers;

    switch (action.type) {
        case "FETCH_PRODUCTS_IN_CART":
            return { ...state, myCart: { cart: action.payload } };
        case "FETCH_PRODUCTS":
            return { ...state, myProducts: { products: action.payload } };
        case "FETCH_MY_ORDERS":
            return { ...state, myOrders: { orders: action.payload } };
        case 'POST_CART':
            return { ...state, myCart: { cart: [...cart, action.payload] } }
        case 'PATCH_CART':
            return {
                ...state,
                myCart: {
                    cart: [...cart, cart.map((item, i) => item.id === action.payload.id ? {
                        ...item, quantity
                            : action.payload.quant
                    } : item)]
                }
            };
        case 'POST_MY_ORDER':
            return { ...state, myOrders: { orders: [...orders, action.payload] } }

        case 'DELETE_CART_ITEM':
            return { ...state, myCart: { cart: cart.filter(item => item.id !== action.payload) } };
        
        case 'POST_USER':
            return { ...state, myUsers: { users: [...users, action.payload] } };
        case 'USER_LOGIN':
            users.filter(user => user.id === action.payload.id)
            return { ...state, loggedInUser: { user: action.payload } };

        default:
            return state;
    }
};

export default reducer;   