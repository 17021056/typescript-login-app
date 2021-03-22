import { call, fork, put, race, take, takeEvery } from "redux-saga/effects";
import { postLoginApp } from "../apis/LoginApi";
import * as Types from "../constants/ActionTypes";
import { rawType } from "../constants/dataType";
import { startLoading, stopLoading } from "../redux/actions";

function* fetchLoginApp(payload: {
  type: string;
  payload: {
    data: rawType;
  };
}) {
//   const {res} = yield race({res:call(postLoginApp,payload.payload.data)});
    const res:{status:number} = yield call(postLoginApp,payload.payload.data)
    
    console.log(res)
    if(res.status===200){
        yield put(stopLoading())
    }
   

}

function* watchFetchLogin() {
  yield takeEvery(Types.FETCH_LOGIN_APP, fetchLoginApp);
}
function* rootSaga() {
  yield fork(watchFetchLogin);
}
export default rootSaga;
