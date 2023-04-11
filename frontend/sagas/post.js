import axios from 'axios';
import {
  call, fork, put, takeLatest, all,
} from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  EDIT_POST_CARD_REQUEST,
  EDIT_POST_CARD_FAILURE,
  EDIT_POST_CARD_SUCCESS } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`); // get은 2번쨰 자리에다가 데이터를 전달할 수 없다. 그래서 쿼리스트링을 이용하여 데이터전달
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: e.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data.postId}`); // get은 2번쨰 자리에다가 데이터를 전달할 수 없다. 그래서 쿼리스트링을 이용하여 데이터전달
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function loadUserPostsAPI(data) {
  return axios.get(`/user/${data.userId}/posts?lastId=${data.lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e.response.data,
    });
  }
}

function loadHashtagPostsAPI(data) {
  return axios.get(`/hashtag/${data.hashtag}/posts?lastId=${data.lastId || 0}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data.postId}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    console.log('result', result);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data.postId}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LIKE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data.postId}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data); // form데이터는 그대로 넣어줘야 된다.
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e.response.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post(`/post/${data.postId}/retweet`); // form데이터는 그대로 넣어줘야 된다.
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: RETWEET_FAILURE,
      error: e.response.data,
    });
  }
}

function editPostCardAPI(data) {
  return axios.patch(`/post/${data.postId}`, data);
}

function* editPostCard(action) {
  try {
    const result = yield call(editPostCardAPI, action.data);
    yield put({
      type: EDIT_POST_CARD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_POST_CARD_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchEditPostCard() {
  yield takeLatest(EDIT_POST_CARD_REQUEST, editPostCard);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchRemovePost),
    fork(watchAddComment), fork(watchLikePost), fork(watchUnlikePost),
    fork(watchUploadImages), fork(watchRetweet), fork(watchLoadPost),
    fork(watchLoadUserPosts), fork(watchLoadHashtagPosts), fork(watchEditPostCard)]);
}
