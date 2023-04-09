import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import useSWR from 'swr';

import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/Layout/AppLayout';
import FollowList from '../components/FollowList';
import NicnameEditForm from '../components/NicknameEditForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

function Profile() {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(`https://api.reacttwitter.shop/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`https://api.reacttwitter.shop/followings?limit=${followingsLimit}`, fetcher);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) return <div>내정보 로딩중..</div>;

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicnameEditForm />
        <FollowList header="팔로잉" data={followingsData} loadMore={loadMoreFollowings} loading={!followingsData && !followingError} />
        <FollowList header="팔로워" data={followersData} loadMore={loadMoreFollowers} loading={!followersData && !followerError} />
      </AppLayout>
    </>
  );
}

// 프론트서버에서 실행되는 부분이 getServerSideProps다
// 브라우저와 다른 공간이기때문에 context.req.headers.cookie = cookie;를 해도 브라우저에는 같은 쿠키가 없다.
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { cookie } = context.req.headers;
  axios.defaults.headers.Cookie = '';
  if (cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ // 로그인이 잠깐 풀려보이는 것을 방지
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
