import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Menu, Input, Row, Col,
} from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';

import Router from 'next/router';
import UserProfile from '../UserProfile';
import LoginForm from '../LoginForm';

const Global = createGlobalStyle` // 밑에 스크롤바 제거
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right:0 !important;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function AppLayout({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const { me } = useSelector((state) => state.user);

  const onChangeSearchInput = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const onSearch = useCallback(() => {
    if (!searchInput) return;
    Router.push(`/hashtag/${searchInput}`);
    setSearchInput('');
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} placeholder="해시태그 입력(#제외)" enterButton />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by ZeroCho
          </a>
        </Col>
      </Row>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
