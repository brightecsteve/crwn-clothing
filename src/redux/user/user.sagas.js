import { onLatest } from '../../helpers/saga-helpers';
import { put, all, call } from 'redux-saga/effects';
import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase.utils';
import {
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutSuccess,
    checkUserSession,
    signUpSuccess,
    signUpFailure,
} from './user.actions';
import UserActionTypes from './user.types';

export function* getSnapshotFromUserAuth(user, additionalData) {
    try {
        const userRef = yield(call(createUserProfileDocument, ...[user, additionalData]));
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { displayName, email, password }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({
            user,
            additionalData: { displayName },
        }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    try {
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* userSagas() {
    yield(all([
        onLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle),
        onLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail),
        onLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession),
        onLatest(UserActionTypes.SIGN_OUT_START, signOut),
        onLatest(UserActionTypes.SIGN_UP_START, signUp),
        onLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    ]));
}
