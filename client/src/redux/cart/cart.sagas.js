import { onLatest } from '../../helpers/saga-helpers';
import { all, put } from 'redux-saga/effects';
import { clearCart } from './cart.actions';
import UserActionTypes from '../user/user.types';

export function* clearCartOnSignout() {
    yield put(clearCart());
}

export function* cartSagas() {
    yield(all([
        onLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignout),
    ]));
}
