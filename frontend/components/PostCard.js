import {
  Card, Popover, Button, Avatar, List, Comment,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';
import EditPostCard from './EditPostCard';

moment.locale('ko');

function PostCard({ post }) {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  const { removePostLoading, editPostCardDone } = useSelector((state) => state.post);

  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const [editPostCardOpend, setEditPostCardOpend] = useState(false);

  useEffect(() => { // 로그인 했을 떄 수정페이지 띄우고 로그아웃시 수정페이지 닫기
    setEditPostCardOpend(false);
  }, [id]);

  useEffect(() => {
    if (editPostCardDone) setEditPostCardOpend(false);
  }, [editPostCardDone]);

  const onClickRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: { postId: post.id },
    });
  }, [id]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { postId: post.id },
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: { postId: post.id },
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);

  const onToggleEditPostCard = useCallback(() => {
    setEditPostCardOpend((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: { postId: post.id },
      });
    }
  }, [id]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onClickRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && <Button onClick={onToggleEditPostCard}>수정</Button>}
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={<Link href={`/user/${post.Retweet.User.id}`} prefetch={false}><Avatar>{post.Retweet.User.nickname[0]}</Avatar></Link>}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
          )
          : (
            <>
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={<Link href={`/user/${post.User.id}`} prefetch={false}><Avatar>{post.User.nickname[0]}</Avatar></Link>}
                title={post.User.nickname}
                description={editPostCardOpend ? <EditPostCard setEditPostCardOpend={setEditPostCardOpend} post={post} /> : <PostCardContent postData={post.content} />}
              />
            </>
          )}
      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Link href={`/user/${item.User.id}`} prefetch={false}><Avatar>{item.User.nickname[0]}</Avatar></Link>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
