import {
  all, delay, fork, put, takeLatest, call,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  INPUT_ORDER_MATERIAL_FAILURE,
  INPUT_ORDER_MATERIAL_REQUEST,
  INPUT_ORDER_MATERIAL_SUCCESS,
  INPUT_RENTAL_MATERIAL_FAILURE,
  INPUT_RENTAL_MATERIAL_REQUEST,
  INPUT_RENTAL_MATERIAL_SUCCESS,
  LOAD_MATERIAL_FAILURE,
  LOAD_MATERIAL_REQUEST,
  LOAD_MATERIAL_SUCCESS,
  IS_READED_CHECK_FAILURE,
  IS_READED_CHECK_REQUEST,
  IS_READED_CHECK_SUCCESS,
  IS_READED_UPDATE_FAILURE,
  IS_READED_UPDATE_REQUEST,
  IS_READED_UPDATE_SUCCESS,
} from '../reducers/material';

function inputOrderMaterialAPI(data) {
  return axios.post('/material/order', data);
}

function* inputOrderMaterial(action) {
  try {
    const result = yield call(inputOrderMaterialAPI, action.data);
    yield put({
      type: INPUT_ORDER_MATERIAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INPUT_ORDER_MATERIAL_FAILURE,
      data: err.response.data,
    });
  }
}

function inputRentalMaterialAPI(data) {
  return axios.post('/material/rental', data);
}

function* inputRentalMaterial(action) {
  try {
    const result = yield call(inputRentalMaterialAPI, action.data);
    yield put({
      type: INPUT_RENTAL_MATERIAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INPUT_RENTAL_MATERIAL_FAILURE,
      data: err.response.data,
    });
  }
}

function loadMaterialAPI(data) {
  return axios.get('/material');
}

function* loadMaterial(action) {
  try {
    const result = yield call(loadMaterialAPI, action.data);
    yield put({
      type: LOAD_MATERIAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MATERIAL_FAILURE,
      data: err.response.data,
    });
  }
}

function isReadedAPI() {
  return axios.get('/material/readed');
}

function* isReaded() {
  try {
    const result = yield call(isReadedAPI);
    yield put({
      type: IS_READED_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_READED_CHECK_FAILURE,
      data: err.response.data,
    });
  }
}

function isReadedUpdateAPI() {
  return axios.patch('/material/update');
}

function* isReadedUpdate() {
  try {
    const result = yield call(isReadedUpdateAPI);
    yield put({
      type: IS_READED_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_READED_UPDATE_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchInputOrderMaterial() {
  yield takeLatest(INPUT_ORDER_MATERIAL_REQUEST, inputOrderMaterial);
}

function* watchInputRentalMaterial() {
  yield takeLatest(INPUT_RENTAL_MATERIAL_REQUEST, inputRentalMaterial);
}

function* watchLoadMaterial() {
  yield takeLatest(LOAD_MATERIAL_REQUEST, loadMaterial);
}

function* watchIsReaded() {
  yield takeLatest(IS_READED_CHECK_REQUEST, isReaded);
}

function* watchIsReadedUpdate() {
  yield takeLatest(IS_READED_UPDATE_REQUEST, isReadedUpdate);
}

export default function* materialSaga() {
  yield all([
    fork(watchInputOrderMaterial),
    fork(watchInputRentalMaterial),
    fork(watchLoadMaterial),
    fork(watchIsReaded),
    fork(watchIsReadedUpdate),
  ]);
}
