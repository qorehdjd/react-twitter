import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logoutRequestAction } from '../reducers/user';

const LogOutButton = styled(Button)`
  margin-top: 10px;
  margin-left: 47px;
`;

function UserProfile() {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>짹짹</Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          <Link href="/profile">팔로잉</Link>
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          <Link href="/profile">팔로워</Link>
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Link href={`/user/${me.id}`} prefetch={false}><Avatar>{me.nickname[0]}</Avatar></Link>}
        title={me.nickname}
      />
      <LogOutButton onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </LogOutButton>
    </Card>
  );
}

export default UserProfile;
