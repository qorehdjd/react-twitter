import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
  Form, Input, Checkbox, Button,
} from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/Layout/AppLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

function Signup() {
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setChangePasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    if (didMount.current) {
      if (signUpDone) Router.replace('/');
      if (signUpError) alert(signUpError);
    } else {
      didMount.current = true;
    }
  }, [signUpDone, signUpError]);

  useEffect(() => {
    if (me) Router.replace('/'); // push는 뒤로가기했을 때 이전페이지로 가지지만 replace는 이전페이지로 안간다
  }, [me]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setChangePasswordCheck(e.target.value);
      setPasswordError(password !== e.target.value);
    },
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원 가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호확인</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            모든 약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getStaticProps(async (context) => { // 로그인 여부에따라 빈페이지지냐 페이지를 보여주냐 달라지므로 getServerSideProps사용
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

export default Signup;
