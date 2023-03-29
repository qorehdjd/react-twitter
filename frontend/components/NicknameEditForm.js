import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

function NicnameEditForm() {
  const dispatch = useDispatch();
  const { changeNicknameDone } = useSelector((state) => state.user);

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (changeNicknameDone) setNickname('');
  }, [changeNicknameDone]);

  const onReviseNickname = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }));

  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton="수정" onChange={onChangeNickname} value={nickname} onSearch={onReviseNickname} />
    </Form>
  );
}

export default NicnameEditForm;
