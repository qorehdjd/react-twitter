exports.id = 252;
exports.ids = [252];
exports.modules = {

/***/ 2878:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4324);
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2167);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reducers_post__WEBPACK_IMPORTED_MODULE_4__]);
_reducers_post__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








function CommentForm({
  post
}) {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const id = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.user.me?.id);
  const {
    addCommentDone,
    addCommentLoading
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.post);
  const [commentText, onChangeCommentText, setCommentText] = (0,_hooks_useInput__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)('');
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (addCommentDone) setCommentText('');
  }, [addCommentDone]);
  const onSubmitComment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__/* .ADD_COMMENT_REQUEST */ .Ot,
      data: {
        content: commentText,
        postId: post.id,
        userId: id
      }
    });
  }, [commentText, id]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_0__.Form, {
    onFinish: onSubmitComment,
    style: {
      position: 'relative',
      margin: 0
    },
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Input.TextArea, {
      value: commentText,
      onChange: onChangeCommentText,
      rows: 4
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Button, {
      type: "primary",
      htmlType: "submit",
      style: {
        position: 'absolute',
        right: 0,
        bottom: -40,
        zIndex: 1
      },
      loading: addCommentLoading,
      children: "\uC090\uC57D"
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentForm);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6584:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2167);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reducers_post__WEBPACK_IMPORTED_MODULE_3__]);
_reducers_post__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const {
  TextArea
} = antd__WEBPACK_IMPORTED_MODULE_1__.Input;
const TextAreaStyle = {
  resize: 'none',
  height: 120,
  marginBotton: 5
};

function EditPostCard({
  setEditPostCardOpend,
  post
}) {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    me
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.user);
  const {
    0: textArea,
    1: setTextArea
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const onChagneTextArea = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    setTextArea(e.target.value);
  }, []);
  const onEditPostCard = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (me.id !== post.User.id) {
      return alert('자신의 게시글이 아닙니다.');
    }

    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_3__/* .EDIT_POST_CARD_REQUEST */ .jk,
      data: {
        textArea,
        postId: post.id
      }
    });
  }, [textArea]);
  const onCancelEditPostCard = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setEditPostCardOpend(false);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(TextArea, {
      rows: 4,
      style: TextAreaStyle,
      value: textArea,
      onChange: onChagneTextArea
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Space, {
      wrap: true,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
        type: "primary",
        onClick: onEditPostCard,
        children: "\uC218\uC815"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
        type: "primary",
        danger: true,
        onClick: onCancelEditPostCard,
        children: "\uCDE8\uC18C"
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditPostCard);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3965:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reducers_user__WEBPACK_IMPORTED_MODULE_3__]);
_reducers_user__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function FollowButton({
  post
}) {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    me,
    unfollowLoading,
    followLoading
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.user);
  const isFollowing = me && me.Followings.find(v => v.nickname === post.User.nickname); // const { nickname } = useSelector((state) => state.user.me);

  const onFollowRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch({
      type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__/* .FOLLOW_REQUEST */ .U_,
      data: {
        nickname: post.User.nickname
      }
    });
  }, []);
  const onUnFollowRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch({
      type: _reducers_user__WEBPACK_IMPORTED_MODULE_3__/* .UNFOLLOW_REQUEST */ .Bk,
      data: {
        nickname: post.User.nickname
      }
    });
  }, []);
  if (post.User.id === me.id) return null;
  return isFollowing ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
    loading: unfollowLoading,
    onClick: onUnFollowRequest,
    children: "\uC5B8\uD314\uB85C\uC6B0"
  }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
    loading: followLoading,
    onClick: onFollowRequest,
    children: "\uD314\uB85C\uC6B0"
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FollowButton);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1252:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _PostImages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(613);
/* harmony import */ var _CommentForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2878);
/* harmony import */ var _PostCardContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5324);
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2167);
/* harmony import */ var _FollowButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3965);
/* harmony import */ var _EditPostCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6584);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_CommentForm__WEBPACK_IMPORTED_MODULE_7__, _reducers_post__WEBPACK_IMPORTED_MODULE_9__, _FollowButton__WEBPACK_IMPORTED_MODULE_10__, _EditPostCard__WEBPACK_IMPORTED_MODULE_11__]);
([_CommentForm__WEBPACK_IMPORTED_MODULE_7__, _reducers_post__WEBPACK_IMPORTED_MODULE_9__, _FollowButton__WEBPACK_IMPORTED_MODULE_10__, _EditPostCard__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















moment__WEBPACK_IMPORTED_MODULE_5___default().locale('ko');

function PostCard({
  post
}) {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const id = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(state => state.user.me?.id);
  const liked = post.Likers.find(v => v.id === id);
  const {
    removePostLoading,
    editPostCardDone
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(state => state.post);
  const {
    0: commentFormOpend,
    1: setCommentFormOpend
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: editPostCardOpend,
    1: setEditPostCardOpend
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // 로그인 했을 떄 수정페이지 띄우고 로그아웃시 수정페이지 닫기
    setEditPostCardOpend(false);
  }, [id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (editPostCardDone) setEditPostCardOpend(false);
  }, [editPostCardDone]);
  const onClickRetweet = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_9__/* .RETWEET_REQUEST */ .a0,
      data: {
        postId: post.id
      }
    });
  }, [id]);
  const onLike = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_9__/* .LIKE_POST_REQUEST */ .xD,
      data: {
        postId: post.id
      }
    });
  }, [id]);
  const onUnLike = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_9__/* .UNLIKE_POST_REQUEST */ .VT,
      data: {
        postId: post.id
      }
    });
  }, [id]);
  const onToggleComment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setCommentFormOpend(prev => !prev);
  }, []);
  const onToggleEditPostCard = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setEditPostCardOpend(prev => !prev);
  }, []);
  const onRemovePost = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    if (window.confirm('정말로 삭제하시겠습니까?')) {
      dispatch({
        type: _reducers_post__WEBPACK_IMPORTED_MODULE_9__/* .REMOVE_POST_REQUEST */ .HU,
        data: {
          postId: post.id
        }
      });
    }
  }, [id]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
    style: {
      marginBottom: 20
    },
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Card, {
      cover: post.Images[0] && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_PostImages__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        images: post.Images
      }),
      actions: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.RetweetOutlined, {
        onClick: onClickRetweet
      }, "retweet"), liked ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.HeartTwoTone, {
        twoToneColor: "#eb2f96",
        onClick: onUnLike
      }, "heart") : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.HeartOutlined, {
        onClick: onLike
      }, "heart"), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.MessageOutlined, {
        onClick: onToggleComment
      }, "comment"), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Popover, {
        content: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Button.Group, {
          children: id && post.User.id === id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
            children: [!post.RetweetId && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Button, {
              onClick: onToggleEditPostCard,
              children: "\uC218\uC815"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Button, {
              type: "danger",
              loading: removePostLoading,
              onClick: onRemovePost,
              children: "\uC0AD\uC81C"
            })]
          }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Button, {
            children: "\uC2E0\uACE0"
          })
        }),
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.EllipsisOutlined, {})
      }, "more")],
      title: post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null,
      extra: id && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_FollowButton__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
        post: post
      }),
      children: post.RetweetId && post.Retweet ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_0__.Card, {
        cover: post.Retweet.Images[0] && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_PostImages__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
          images: post.Retweet.Images
        }),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
          style: {
            float: 'right'
          },
          children: moment__WEBPACK_IMPORTED_MODULE_5___default()(post.createdAt).format('YYYY.MM.DD')
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Card.Meta, {
          avatar: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
            href: `/user/${post.Retweet.User.id}`,
            prefetch: false,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Avatar, {
              children: post.Retweet.User.nickname[0]
            })
          }),
          title: post.Retweet.User.nickname,
          description: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_PostCardContent__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
            postData: post.Retweet.content
          })
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
          style: {
            float: 'right'
          },
          children: moment__WEBPACK_IMPORTED_MODULE_5___default()(post.createdAt).format('YYYY.MM.DD')
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Card.Meta, {
          avatar: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
            href: `/user/${post.User.id}`,
            prefetch: false,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Avatar, {
              children: post.User.nickname[0]
            })
          }),
          title: post.User.nickname,
          description: editPostCardOpend ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_EditPostCard__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
            setEditPostCardOpend: setEditPostCardOpend,
            post: post
          }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_PostCardContent__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
            postData: post.content
          })
        })]
      })
    }), commentFormOpend && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_CommentForm__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
        post: post
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.List, {
        header: `${post.Comments.length}개의 댓글`,
        itemLayout: "horizontal",
        dataSource: post.Comments,
        renderItem: item => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("li", {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Comment, {
            author: item.User.nickname,
            avatar: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
              href: `/user/${item.User.id}`,
              prefetch: false,
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Avatar, {
                children: item.User.nickname[0]
              })
            }),
            content: item.content
          })
        })
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostCard);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5324:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




function PostCardContent({
  postData
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    children: postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
          legacyBehavior: true,
          href: `/hashtag/${v.slice(1)}`,
          prefetch: false,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("a", {
            children: v
          })
        }, i);
      }

      return v;
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostCardContent);

/***/ }),

/***/ 613:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_PostImages)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: external "react-slick"
var external_react_slick_ = __webpack_require__(8096);
var external_react_slick_default = /*#__PURE__*/__webpack_require__.n(external_react_slick_);
// EXTERNAL MODULE: ./node_modules/slick-carousel/slick/slick.css
var slick = __webpack_require__(8278);
// EXTERNAL MODULE: ./node_modules/slick-carousel/slick/slick-theme.css
var slick_theme = __webpack_require__(782);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./components/ImagesZoom/style.js

const OverLay = external_styled_components_default().div.withConfig({
  displayName: "style__OverLay",
  componentId: "sc-je2jl4-0"
})(["position:fixed;z-index:1000;top:0;left:0;right:0;bottom:0;"]);
const Header = external_styled_components_default().header.withConfig({
  displayName: "style__Header",
  componentId: "sc-je2jl4-1"
})(["height:44px;background:white;position:relative;padding:0;text-align:center;& h1{margin:0;font-size:17px;color:#333;line-height:44px;}& button{position:absolute;right:0;top:0;padding:15px;line-height:14px;height:100%;font-size:18px;cursor:pointer;background-color:white;border:none;font-weight:370;}"]);
const SlickWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__SlickWrapper",
  componentId: "sc-je2jl4-2"
})(["height:calc(100% - 44px);background:#090909;"]);
const ImgWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__ImgWrapper",
  componentId: "sc-je2jl4-3"
})(["padding:32px;text-align:center;& img{margin:0 auto;max-height:750px;}"]);
const Indicator = external_styled_components_default().div.withConfig({
  displayName: "style__Indicator",
  componentId: "sc-je2jl4-4"
})(["text-align:center;& > div{width:75px;height:30px;line-height:30px;border-radius:15px;background:#313131;display:inline-block;text-align:center;color:white;font-size:15px;}"]);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/ImagesZoom/index.js








function ImagesZoom({
  images,
  onClose
}) {
  const {
    0: currentSlide,
    1: setCurrentSlide
  } = (0,external_react_.useState)(0);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(OverLay, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(Header, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: "\uC0C1\uC138 \uC774\uBBF8\uC9C0"
      }), /*#__PURE__*/jsx_runtime_.jsx("button", {
        onClick: onClose,
        children: "X"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(SlickWrapper, {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        children: [/*#__PURE__*/jsx_runtime_.jsx((external_react_slick_default()), {
          initialSlide: 0,
          afterChange: slide => setCurrentSlide(slide),
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          children: images.map(v => /*#__PURE__*/jsx_runtime_.jsx(ImgWrapper, {
            children: /*#__PURE__*/jsx_runtime_.jsx("img", {
              src: `${v.src.replace(/\/thumb\//, '/original/')}`,
              alt: v.src
            })
          }, v.src))
        }), /*#__PURE__*/jsx_runtime_.jsx(Indicator, {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            children: [currentSlide + 1, "/", images.length]
          })
        })]
      })
    })]
  });
}

/* harmony default export */ const components_ImagesZoom = (ImagesZoom);
;// CONCATENATED MODULE: ./components/PostImages.js







function PostImages({
  images
}) {
  const {
    0: showImagesZoom,
    1: setShowImageZoom
  } = (0,external_react_.useState)(false);
  const onZoom = (0,external_react_.useCallback)(() => {
    setShowImageZoom(true);
  }, []);
  const onClose = (0,external_react_.useCallback)(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        role: "presentation" // 시각장애인을 위함
        ,
        style: {
          maxHeight: '500px'
        },
        src: `${images[0].src}`,
        alt: images[0].src,
        onClick: onZoom
      }), showImagesZoom && /*#__PURE__*/jsx_runtime_.jsx(components_ImagesZoom, {
        images: images,
        onClose: onClose
      })]
    });
  }

  if (images.length === 2) {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        role: "presentation",
        style: {
          width: '50%',
          display: 'inline-block'
        },
        src: `${images[0].src}`,
        alt: images[0].src,
        onClick: onZoom
      }), /*#__PURE__*/jsx_runtime_.jsx("img", {
        role: "presentation",
        style: {
          width: '50%',
          display: 'inline-block'
        },
        src: `${images[1].src}`,
        alt: images[1].src,
        onClick: onZoom
      }), showImagesZoom && /*#__PURE__*/jsx_runtime_.jsx(components_ImagesZoom, {
        images: images,
        onClose: onClose
      })]
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
        role: "presentation",
        style: {
          width: '50%'
        },
        src: `${images[0].src}`,
        alt: images[0].src,
        onClick: onZoom
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        role: "presentation",
        style: {
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle'
        },
        onClick: onZoom,
        children: [/*#__PURE__*/jsx_runtime_.jsx(icons_.PlusOutlined, {}), /*#__PURE__*/jsx_runtime_.jsx("br", {}), images.length - 1, "\uAC1C\uC758 \uC0AC\uC9C4 \uB354\uBCF4\uAE30"]
      })]
    }), showImagesZoom && /*#__PURE__*/jsx_runtime_.jsx(components_ImagesZoom, {
      images: images,
      onClose: onClose
    })]
  });
}

/* harmony default export */ const components_PostImages = (PostImages);

/***/ }),

/***/ 782:
/***/ (() => {



/***/ }),

/***/ 8278:
/***/ (() => {



/***/ })

};
;