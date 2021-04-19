import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BellOutlined, BarsOutlined } from '@ant-design/icons';
import { IS_READED_CHECK_REQUEST } from '../reducers/material';
import { IS_READED_UPDATE_REQUEST } from '../reducers/material';
import Router from 'next/router';

const Header = styled.header`
  margin: 0 auto;
  height: 10vh;
  max-height: 10vh;
  padding: 0 20px;
  vertical-align: center;
  background: #b153be;
`;

const DivWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const DivRightWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  width: 70px;
`;

const HeaderText = styled.p`
  margin: 0;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 100%;
`;

const PageTitle = styled.p`
margin: 0 auto;
display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  max-height: 10vh;
  background-color: white;
  font-size: 20px;
  border: 1px solid #4b0000;
  font-weight: bold;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
`

const AppLayout = ({ children, title }) => {
  const { me } = useSelector((state) => state.user);
  const { isReaded } = useSelector((state) => state.material);
  const dispatch = useDispatch();
  let color = "white";
  if (me) {
    if (me.workIn === "점검기관") {
      useEffect(() => {
        dispatch({
          type: IS_READED_CHECK_REQUEST,
        });
      }, [me && me.id])
    }
  }

  if (!isReaded || isReaded.length < 1) {
    color = "white"
  } else {
    color = "yellow"
  }

  const goToProcure = useCallback((e) => {
    dispatch({
      type: IS_READED_UPDATE_REQUEST,
    });
    Router.push('/openMaterialManager');
  }, []);

  console.log(color, isReaded, typeof (isReaded));
  return (
    <>
      <Header>
        <DivWrapper>
          <HeaderText><Link href="/"><a style={{ color: "white" }}>SSP</a></Link></HeaderText>
          <DivRightWrapper>
            <Link href="/openMaterialManager"><a><Button onClick={goToProcure}><BellOutlined style={{ fontSize: 25, color: color }} /></Button></a></Link>
            <Link href="/menu"><a><BarsOutlined style={{ fontSize: 25, color: 'white' }} /></a></Link>
          </DivRightWrapper>
        </DivWrapper>
      </Header>
      <PageTitle>
        {title}
      </PageTitle>
      <div style={{ height: '100vh', maxHeight: '80vh', backgroundColor: '#f3f3f3' }}>{children}</div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
