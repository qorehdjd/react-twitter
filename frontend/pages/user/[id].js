import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import { useRouter } from 'next/router';
import Head from 'next/head';
import AppLayout from '../../components/Layout/AppLayout';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

function User() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const didMount = useRef(false);
  const { me } = useSelector((state) => state.user);
  const { userPosts, hasMorePost, loadUserPostsLoading, retweetError } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

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
      if (loadUserPostsLoading) return;
      if (window.scrollY + document.documentElement.clientHeight + 500 > document.documentElement.scrollHeight) {
        const lastId = userPosts[userPosts.length - 1]?.id;
        dispatch({
          type: LOAD_USER_POSTS_REQUEST,
          data: { userId: id, lastId },
        });
      }
    }
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [hasMorePost, loadUserPostsLoading, userPosts, id]);

  return (
    <AppLayout>
      {userInfo && (
      <Head>
        <title>{userInfo.nickname}님의 글</title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
      </Head>
      )}
      {me && <PostForm />}
      {userPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { cookie } = context.req.headers;
  axios.defaults.headers.Cookie = '';
  if (cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: { userId: context.params.id },
  });
  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
    data: { userId: context.params.id },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
