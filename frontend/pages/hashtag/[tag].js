import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import axios from 'axios';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/Layout/AppLayout';

function Hashtag() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { hasMorePost, loadHashtagPostsLoading, hashtagPosts } = useSelector((state) => state.post);

  useEffect(() => {
    function infiniteScroll() {
      if (!hasMorePost) return window.removeEventListener('scroll', infiniteScroll);
      if (loadHashtagPostsLoading) return;
      if (window.scrollY + document.documentElement.clientHeight + 500 > document.documentElement.scrollHeight) {
        const lastId = hashtagPosts[hashtagPosts.length - 1]?.id;
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          data: { hashtag: tag, lastId },
        });
      }
    }
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [hasMorePost, loadHashtagPostsLoading, hashtagPosts, tag]);

  return (
    <AppLayout>
      {hashtagPosts.map((c) => (
        <PostCard key={c.id} post={c} />
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
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: { hashtag: context.params.tag },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Hashtag;
