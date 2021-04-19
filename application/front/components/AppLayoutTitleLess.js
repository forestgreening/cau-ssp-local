import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { BellOutlined, BarsOutlined } from '@ant-design/icons';

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
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 100%;
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <Header>
        <DivWrapper>
          <HeaderText>SSP</HeaderText>
          <DivRightWrapper>
            <Link href="/alarm"><a><BellOutlined style={{ fontSize: 25, color: 'white' }} /></a></Link>
            <Link href="/menu"><a><BarsOutlined style={{ fontSize: 25, color: 'white' }} /></a></Link>
          </DivRightWrapper>
        </DivWrapper>
      </Header>
      <div style={{ height: '90vh', maxHeight: '90vh', backgroundColor: '#f3f3f3' }}>{children}</div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
