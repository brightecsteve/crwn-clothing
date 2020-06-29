import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reduer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
});
