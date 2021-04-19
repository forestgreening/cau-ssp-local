import {
  all, delay, fork, put, takeLatest, call,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  CAPTURE_FAILURE,
  CAPTURE_REQUEST,
  CAPTURE_SUCCESS,
  CANCLE_CAPTURE_FAILURE,
  CANCLE_CAPTURE_REQUEST,
  CANCLE_CAPTURE_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  LOAD_PHOTOS_FAILURE,
  LOAD_PHOTOS_REQUEST,
  LOAD_PHOTOS_SUCCESS,
} from '../reducers/photo';

function* loadCapture(action) {
  try {
    yield put({
      type: CAPTURE_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CAPTURE_FAILURE,
      data: err.response.data,
    });
  }
}

function* loadCancleCapture() {
  try {
    yield put({
      type: CANCLE_CAPTURE_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCLE_CAPTURE_FAILURE,
      data: err.response.data,
    });
  }
}

function uploadAPI(data) {
  return axios.post('/photo/upload', data);
}

function* upload(action) {
  try {
    const result = yield call(uploadAPI, action.data);
    yield put({
      type: UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_FAILURE,
      data: err.response.data,
    });
  }
}

function loadPhotosAPI() {
  return axios.get('/photo/loadPhotos');
}

function* loadPhotos() {
  try {
    const result = yield call(loadPhotosAPI);
    yield put({
      type: LOAD_PHOTOS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PHOTOS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchCapture() {
  yield takeLatest(CAPTURE_REQUEST, loadCapture);
}

function* watchCancleCapture() {
  yield takeLatest(CANCLE_CAPTURE_REQUEST, loadCancleCapture);
}

function* watchUpload() {
  yield takeLatest(UPLOAD_REQUEST, upload);
}

function* watchLoadPhotos() {
  yield takeLatest(LOAD_PHOTOS_REQUEST, loadPhotos);
}

export default function* photoSaga() {
  yield all([
    fork(watchCapture),
    fork(watchCancleCapture),
    fork(watchUpload),
    fork(watchLoadPhotos),
  ]);
}
