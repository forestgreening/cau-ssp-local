import styled from 'styled-components';
import Router from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import AppLayout from '../components/AppLayoutTitleLess';

const Background = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    justify-content: center;
    background: #b153be;
`;

const Button = styled.button`
    background: inherit;
    border: none;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-bottom: 15px;
`;

const menu = () => {
  const dispatch = useDispatch();
  const goToMyPage = useCallback(() => {
    Router.push('/myPage');
  });
  const goToFieldList = useCallback(() => {
    Router.push('/');
  });
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
    Router.push('/');
  })
  return (
    <>
      <AppLayout>
        <Background>
          <Button onClick={goToMyPage}>마이페이지</Button>
          <Button onClick={goToFieldList}>현장 리스트</Button>
          <Button onClick={onLogOut}>로그아웃</Button>
        </Background>
      </AppLayout>
    </>
  );
};

export default menu;
