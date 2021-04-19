import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { LOAD_MATERIAL_REQUEST, IS_READED_UPDATE_REQUEST } from '../reducers/material';

const Container = styled.div`
  margin: 0 auto;
  width: 350px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 40%;
  transform: translateY(-40%);
  text-align: center;
  vertical-align: center;
`;

const FiledFirst = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 150px;
  background-color: #b153be;
  color: white;
  font-size: 30px;
`;

const Button = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 150px;
  background-color: #b153be;
  color: white;
  font-size: 30px;
`;

const procureManagement = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { material } = useSelector((state) => state.material);

  useEffect(() => {
    if (!material) {
      dispatch({
        type: LOAD_MATERIAL_REQUEST,
      });
    }
  }, [material]);

  const goToProcure = useCallback((e) => {
    dispatch({
      type: IS_READED_UPDATE_REQUEST,
    });
    Router.push('/openMaterialManager');
  }, []);

  return (
    <AppLayout title="조달관리">
      <Container>

        {me.workIn === "점검기관" ? <Button onClick={goToProcure}>자재정보 <br />열람하기 <br />(점검용)</Button> : null}
        {me.workIn === "발주자" ? <Link href="/openMaterialOrderer"><FiledFirst>자재정보 <br />열람하기 <br />(발주자)</FiledFirst></Link> : null}
        {me.workIn === "원도급자" ? <Link href="/inputMaterial"><FiledFirst>자재정보 <br />입력하기 <br />(시공사)</FiledFirst></Link> : null}
        {me.workIn === "원도급자" ? <Link href="/openMaterial"><FiledFirst>자재정보 <br />열람하기 <br />(시공사)</FiledFirst></Link> : null}
        {me.workIn === "하도급자" ? <Link href="/inputRentalMaterial"><FiledFirst>자재정보 <br />입력하기 <br />(임대업)</FiledFirst></Link> : null}
        {me.workIn === "하도급자" ? <Link href="/openRentalMaterial"><FiledFirst>자재정보 <br />열람하기 <br />(임대업)</FiledFirst></Link> : null}
      </Container>

      {/* <Link href="/openMaterialCheck"><FiledFirst>자재정보 <br />열람하기 <br />(관리자)</FiledFirst></Link> */}
    </AppLayout>
  );
};

export default procureManagement;
