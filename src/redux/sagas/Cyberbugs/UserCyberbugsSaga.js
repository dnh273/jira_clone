import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'

import { history } from '../../../util/history';
import { userService } from '../../../services/UserService';
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_LIST_USER, GET_LIST_USER_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, SIGN_UP_USER_SAGA } from '../../constants/Cyberbugs/UserConstatnts';
import { array } from 'yup';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';
import { type } from '@testing-library/user-event/dist/type';

//Quản lý các action saga
function* signinSaga(action) {
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));

        //Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));


        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        // let history = yield select(state=> state.HistoryReducer.history)

        history.push('/cyberbugs');

    } catch (err) {
        console.log(err.response.data)
    }


    yield put({
        type: HIDE_LOADING
    })

}


export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}




//Quản lý các action saga
function* getUserSaga(action) {

    //action.keyWord
    // console.log("keyword", action.keyWord);
    //Gọi api 
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyWord));

        yield put({
            type: 'GET_USER_SEARCH',
            lstUserSearch: data.content
        })
        // console.log("data", data);

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiGetUser() {
    yield takeLatest("GET_USER_API", getUserSaga);
}
function* searchUserSaga(action) {

    //action.keyWord
    // console.log("keyword", action.keyWord);
    //Gọi api 
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyWord));

        yield put({
            type: GET_LIST_USER,
            listUser: data.content
        })
        // console.log("data", data);

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiSearchUserSaga() {
    yield takeLatest("SEARCH_USER_API", searchUserSaga);
}





//Quản lý các action saga
function* addUserProjectSaga(action) {


    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiAddUserProject() {
    yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}






//Quản lý các action saga
function* removeUserProjectSaga(action) {


    try {
        const { data, status } = yield call(() => userService.deleteUserFromProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiRemoveUserProject() {
    yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}




function* getUserByProjectIdSaga(action) {
    const { idProject } = action;
    // console.log('action',idProject)

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));
        // console.log('checkdata',data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: data.content
            })
        }

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }
}



export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}

function* signUpUserSaga(action) {
    const { userDetails } = action;

    try {
        const { data, status } = yield call(() => userService.signUpUser(userDetails));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Sign Up successfully !')
        }

        yield put({
            type:GET_LIST_USER_SAGA
        })

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        notifiFunction('error', err.response?.data.message)

    }
}



export function* theoDoiSignUpUserSaga() {
    yield takeLatest(SIGN_UP_USER_SAGA, signUpUserSaga)
}

function* getListUserSaga(action) {

    try {
        const { data, status } = yield call(() => userService.getUser(""));
        // console.log('checkdata',data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_USER,
                listUser: data.content
            })
        }


    } catch (err) {
        console.log(err);
        console.log(err.response?.data);


    }
}



export function* theoDoiGetListUserSaga() {
    yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga)
}


function* editUserSaga(action) {
    console.log('action userdetail',action.userDetails);
    try {
        const { data, status } = yield call(() => userService.editUser(action.userDetails));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Edit User successfully !')
            yield put({
                type:'CLOSE_DRAWER'
            })
            yield put({
                type:'GET_LIST_USER_SAGA'
            })
        }


    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        notifiFunction('error', err.response?.data.message)


    }
}



export function* theoDoiEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}

function * deleteUserSaga(action) {

    try{
        const { data, status } = yield call(() => userService.deleteUser(action.userId));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Delete User successfully !')
            // yield put({
            //     type:'CLOSE_DRAWER'
            // })
            yield put({
                type:'GET_LIST_USER_SAGA'
            })
        }
    }catch (err) {
        console.log(err);
        console.log(err.response?.data);
        notifiFunction('error', err.response?.data.message)

    }
}
export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}