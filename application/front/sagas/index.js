import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import photoSaga from './photo';
import materialSaga from './material';

// axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.baseURL = 'http://api.forestgreening.shop';
// ngrok 2개 열어서 모바일 쪽 cors 열어주고 접근하면 가능은 함
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(photoSaga),
    fork(materialSaga),
  ]);
}
