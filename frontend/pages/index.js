import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/Layout/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

function Home() {
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (didMount.current) {
      if (retweetError) alert(retweetError);
    } else {
      didMount.current = true;
    }
  }, [retweetError]);

  useEffect(() => {
    function infiniteScroll() {
      if (!hasMorePost) return window.removeEventListener('scroll', infiniteScroll);
      if (loadPostsLoading) return;
      if (window.scrollY + document.documentElement.clientHeight + 500 > document.documentElement.scrollHeight) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        });
      }
    }
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [hasMorePost, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

// 프론트 서버에서 실행되는 부분
// 첫요청은 라우터 부분으로 ('/',(req, res, next) => {}) 식으로 페이지가 각각의 라우터이다.
// 그다음부터는 클라이언트사이드 라우터로 서버에서 json데이터(getServerSideProps에서 return한값)을 가져온다
// localhost:3060/로 요청이 왔을 때 index페이지의 getServerSideProps가 실행된다.
// getServerSideProps에서는 항상 context.req가 존재한다
export const getServerSideProps = wrapper.getServerSideProps(async (context) => { // Home보다 먼저 실행돼서 데이터를 가져온다
  console.log(123);
  const { cookie } = context.req.headers; // context.req는 브라우저에서 보낸 정보
  axios.defaults.headers.Cookie = ''; // 쿠키가 공유되는걸 막는다
  if (cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  // 실행된 결과들을 hydrate로 전달해준다.
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END); // REQUEST요청 보내고 SUCCESS 될때까지 기다려준다.
  await context.store.sagaTask.toPromise();
});

export default Home;
