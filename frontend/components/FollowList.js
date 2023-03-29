import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

function FollowList({ header, data, loadMore, loading }) {
  const dispatch = useDispatch();

  const onCancel = useCallback((nickname) => () => {
    console.log('header', header);
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: { nickname },
      });
    }
    if (header === '팔로워') {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: { nickname },
      });
    }
  }, []);

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={((
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={loadMore} loading={loading}>더 보기</Button>
        </div>
        )
      )}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.nickname)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.prototype = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
