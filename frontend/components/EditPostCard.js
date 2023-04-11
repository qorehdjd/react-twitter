import React, { useCallback, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_POST_CARD_REQUEST } from '../reducers/post';

const { TextArea } = Input;

const TextAreaStyle = {
  resize: 'none',
  height: 120,
  marginBotton: 5,
};

function EditPostCard({ setEditPostCardOpend, post }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [textArea, setTextArea] = useState('');

  const onChagneTextArea = useCallback((e) => {
    setTextArea(e.target.value);
  }, []);

  const onEditPostCard = useCallback(() => {
    if (me.id !== post.User.id) {
      return alert('자신의 게시글이 아닙니다.');
    }
    dispatch({
      type: EDIT_POST_CARD_REQUEST,
      data: { textArea, postId: post.id },
    });
  }, [textArea]);

  const onCancelEditPostCard = useCallback(() => {
    setEditPostCardOpend(false);
  }, []);

  return (
    <>
      <TextArea rows={4} style={TextAreaStyle} value={textArea} onChange={onChagneTextArea} />
      <Space wrap>
        <Button type="primary" onClick={onEditPostCard}>수정</Button>
        <Button type="primary" danger onClick={onCancelEditPostCard}>취소</Button>
      </Space>
    </>
  );
}

export default EditPostCard;
