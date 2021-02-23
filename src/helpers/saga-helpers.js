import { call, takeLatest } from 'redux-saga/effects';

export const onLatest = (actionType, generator) => call(function* () {
    yield takeLatest(actionType, generator);
});
