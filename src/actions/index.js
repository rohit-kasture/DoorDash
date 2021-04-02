import api from '../APIs/api';

import { FETCH_PRODUCTS, SELECTED_PRODUCT, POST_CART, PATCH_CART, POST_USER, USER_LOGIN, FETCH_PRODUCTS_IN_CART, POST_MY_ORDER, FETCH_MY_ORDERS, DELETE_CART_ITEM } from './types';

let i = 100;
let users = null;

export const getAlluser = () => async dispatch => {
  users = await api.get('/myusers');
  dispatch({ type: POST_USER, payload: users.data });
};
export const getAllProduct = () => async dispatch => {
  const response = await api.get('/products');
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};
export const fetchCartItems = () => async dispatch => {
  const response = await api.get('/cart');
  dispatch({ type: FETCH_PRODUCTS_IN_CART, payload: response.data });
};
export const fetchOrderItems = () => async dispatch => {
  const response = await api.get('/myorders');
  dispatch({ type: FETCH_MY_ORDERS, payload: response.data });
};

export const deleteItemFromCart = (id) => async dispatch => {
  console.log("typeof (id)" + typeof (id));
  id = parseInt(id);
  //console.log("typeof (id)" + typeof (id));
  const response = await api.delete(`/cart/${id}`);
  //console.log(id + "response " + response);
  dispatch({ type: DELETE_CART_ITEM, payload: response.data });
};
export const addToCart = (p, quantity, user) => async dispatch => {
  let  id = p.id
  let response1 = await api.get(`/cart`, {
    params: {
      prodID: `${p.id}`
    }
  });
  response1 = response1?.data[0];

  if (response1?.length != 0 && response1?.user === user) {    
    quantity = parseInt(quantity) + parseInt(response1?.quantity);
    response1 = { ...response1, "quantity": quantity };
    let response2 = await api.patch(`/cart/${response1.id}`, response1);
    dispatch({ type: PATCH_CART, payload: { id: `${response1.id}`, quant: response1.quantity } });
  }
  else {
    p = { ...p, "user": user };
    p = { ...p, "quantity": parseInt(quantity) };
    p = { ...p, "prodID": parseInt(p.id) };
    delete p.id;
    let response3 = await api.post(`/cart`, p);
    dispatch({ type: POST_CART, payload: response3.data });
  }
};
const date = new Date().toLocaleString()
export const postCartItemsToMyOrders = (cart) => async dispatch => {
  let refId = "MYFOODAPP";
  cart.map(async element => {
    let success = await api.delete(`/cart/${element.id}`);
    dispatch({ type: DELETE_CART_ITEM, payload: success.data });
    delete element.id;
    refId = refId + i++;
    element = { ...element, "refId": refId };
    element = { ...element, "status": "Order Placed" };
    element = { ...element, "timeStamp": date };
    let response = await api.post('/myorders', element);
    console.log("response.data = " + response.data)
    console.log("response =" + response)
    dispatch({ type: POST_MY_ORDER, payload: response.data });
  });

};

export const postUser = (user) => async dispatch => {
  let response = await api.post('/myusers', user);
  dispatch({ type: POST_USER, payload: response.data });
};

export const loginUser = (user) => async dispatch => {
  //console.log("user = " + JSON.stringify(user));
  let users = await api.get('/myusers');
  const flag = users.data.map((u) => {
    if ((u.userId) === user['userId'] && u.password === user['password']) {
      document.getElementById("user").innerText = `Welcome ${u.userId}`;
      dispatch({ type: USER_LOGIN, payload: user });
      return true;
    }
  }
  );
  if (!flag) {
    dispatch({ type: USER_LOGIN, payload: null });
  }
};

export const selectedProduct = (id) => async dispatch => {
  let response = await api.get('/products', {
    params: {
      id: `${id}`
    }
  });
  dispatch({ type: SELECTED_PRODUCT, payload: response.data[0] });
};

