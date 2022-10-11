import { call, delay, put, takeLatest } from "redux-saga/effects";
import {commentsService} from "../../../services/CommentsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DELETE_COMMENT, DELETE_COMMENT_SAGA, GET_ALL_COMMENTS, GET_ALL_COMMENTS_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../constants/Cyberbugs/CommentConstans";

function* getAllComments(action) {

  
 
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => commentsService.getAllComments(action.taskId));
        //Gọi api thành công thì dispatch lên reducer thông qua put

        if (status === STATUS_CODE.SUCCESS) {
           
        yield put({type:GET_ALL_COMMENTS,listComment:data.content});

        }


    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
    }
   
   
}





export function* theoDoiGetAllcommentSaga() {
    yield takeLatest(GET_ALL_COMMENTS_SAGA, getAllComments);
}


function* insertComment(action) {

    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => commentsService.insertComment(action.newComment));

    } catch (err) {
        console.log(err);
        console.log(err.response?.data)

    }
}
export function* theoDoiInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertComment);
}




function* deleteComment(action) {
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => commentsService.deleteComment(action.commentId));
        yield put({type: GET_ALL_COMMENTS_SAGA, taskId: action.taskId});

    } catch (err) {
        console.log(err);
        console.log(err.response?.data)

    }
}
export function* theoDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteComment);
}

function* updateComment(action) {
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => commentsService.updateComment(action.commentId,action.commentContent));

        yield put({type: GET_ALL_COMMENTS_SAGA, taskId: action.taskId});

    } catch (err) {
        console.log(err);
        console.log(err.response?.data)

    }
}
export function* theoDoiUpdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateComment);
}