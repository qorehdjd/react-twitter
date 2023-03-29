import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from '../components/Layout/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_USER_INFO_REQUEST } from '../reducers/user';

function Profile() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description="노드버드 매니아"
            />
          </Card>
        )
        : null}
    </AppLayout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async (context) => { // getStaticProps는 미리 html페이지를 만들어둬서 제공한다. 서버에 무리가 덜간다
  console.log('getStaticProps');
  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
    data: { userId: 1 },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
