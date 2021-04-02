import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import data from './data';
import selectedProduct from './selectedProduct';

export default combineReducers({
  form: formReducer,
  ordersState: data,
  cartState: data,
  productsState: data,
  myUsersState: data,
  loggedInUserState: data,
  selectedProduct:selectedProduct
});

