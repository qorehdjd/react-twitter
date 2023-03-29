import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { me, unfollowLoading, followLoading } = useSelector((state) => state.user);
  const isFollowing = me && me.Followings.find((v) => v.nickname === post.User.nickname);
  // const { nickname } = useSelector((state) => state.user.me);

  const onFollowRequest = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: { nickname: post.User.nickname },
    });
  }, []);

  const onUnFollowRequest = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: { nickname: post.User.nickname },
    });
  }, []);

  if (post.User.id === me.id) return null;

  return (
    isFollowing ? <Button loading={unfollowLoading} onClick={onUnFollowRequest}>언팔로우</Button>
      : <Button loading={followLoading} onClick={onFollowRequest}>팔로우</Button>
  );
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
