/* eslint-disable import/no-extraneous-dependencies */
import produce from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [], // 이미지 올릴 때 미리보기 기능 / imagePath를 백엔드서버로 보내서 Image([])에 넣어서 포스터 저장
  singlePost: null,
  userPosts: [],
  hashtagPosts: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: false,
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: false,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: false,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  upLoadImagesError: false,
  retweetLoading: false,
  retweetDone: false,
  retweetError: false,
  editPostCardLoading: false,
  editPostCardDone: false,
  editPostCardError: false,
};

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE'; // 이미지는 자산이기떄문에 보통 서버쪽에서 안지우고 프론트에서만 지워준다.

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const EDIT_POST_CARD_REQUEST = 'EDIT_POST_CARD_REQEUST';
export const EDIT_POST_CARD_SUCCESS = 'EDIT_POST_CARD_SUCCESS';
export const EDIT_POST_CARD_FAILURE = 'EDIT_POST_CARD_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePost = action.data.length === 5;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = false;
      break;
    case LOAD_POST_SUCCESS:
      draft.singlePost = action.data;
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = true;
      draft.loadPostError = action.error;
      break;
    case LOAD_USER_POSTS_REQUEST:
      draft.loadUserPostsLoading = true;
      draft.loadUserPostsDone = false;
      draft.loadUserPostsError = false;
      break;
    case LOAD_USER_POSTS_SUCCESS:
      draft.loadUserPostsLoading = false;
      draft.loadUserPostsDone = true;
      draft.userPosts = draft.userPosts.concat(action.data);
      draft.hasMorePost = action.data.length === 5;
      break;
    case LOAD_USER_POSTS_FAILURE:
      draft.loadUserPostsLoading = false;
      draft.loadUserPostsError = action.error;
      break;
    case LOAD_HASHTAG_POSTS_REQUEST:
      draft.loadHashtagPostsLoading = true;
      draft.loadHashtagPostsDone = false;
      draft.loadHashtagPostsError = false;
      break;
    case LOAD_HASHTAG_POSTS_SUCCESS:
      draft.loadHashtagPostsLoading = false;
      draft.loadHashtagPostsDone = true;
      draft.hashtagPosts = draft.hashtagPosts.concat(action.data);
      draft.hasMorePost = action.data.length === 5;
      break;
    case LOAD_HASHTAG_POSTS_FAILURE:
      draft.loadHashtagPostsLoading = false;
      draft.loadHashtagPostsError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      draft.imagePaths = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.upLoadImagesError = false;
      break;
    case UPLOAD_IMAGES_SUCCESS:
      draft.imagePaths = draft.imagePaths.concat(action.data);
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.upLoadImagesError = action.error;
      break;
    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v) => v !== action.data.imagePath);
      break;
    case RETWEET_REQUEST:
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = false;
      break;
    case RETWEET_SUCCESS:
      draft.mainPosts.unshift(action.data);
      draft.retweetLoading = false;
      draft.retweetDone = true;
      break;
    case RETWEET_FAILURE:
      draft.retweetLoading = false;
      draft.retweetError = action.error;
      break;
    case EDIT_POST_CARD_REQUEST:
      draft.editPostCardLoading = true;
      draft.editPostCardDone = false;
      draft.editPostCardError = false;
      break;
    case EDIT_POST_CARD_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
      draft.mainPosts[postIndex].content = action.data.content;
      draft.editPostCardLoading = false;
      draft.editPostCardDone = true;
      break;
    }
    case EDIT_POST_CARD_FAILURE:
      draft.editPostCardLoading = false;
      draft.editPostCardError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
