import styled from 'styled-components';
import Router from 'next/router';
import { useCallback } from 'react';
import AppLayout from '../components/AppLayoutTitleLess';

const Background = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #b153be;
`;

const Circle = styled.button`
    width: 170px;
    height: 170px;
    border: none;
    border-radius : 50%;
    color: #b153be;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const completeUpload = () => {
  const goToBack = useCallback(() => {
    Router.push('/installManagement');
  });
  return (
    <>
      <AppLayout>
        <Background>
          <Circle onClick={goToBack}>업로드 완료</Circle>
        </Background>
      </AppLayout>
    </>
  );
};

export default completeUpload;
