import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';

import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  // style={{marginTop:10}}(인라인스타일)을 할경우 리액트가 객체를 보고 변화가 없지만 리렌더링을 시키므로 문제발생
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

function LoginForm() {
  const dispatch = useDispatch(); // store.dispatch()랑 같다. 리덕스를 쓰면 useState를 쓸 일이 거의 없어진다.
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      if (logInError) {
        alert(logInError);
      }
    } else {
      didMount.current = true;
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  // const style = useMemo(() => ({ marginTop: 10 }), []); // 값을 캐싱한다

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <Input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
          type="email"
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}

export default LoginForm;
