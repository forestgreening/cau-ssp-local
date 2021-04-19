import Router from 'next/router';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import AppLayout from '../components/AppLayout';
import { CANCLE_CAPTURE_REQUEST, UPLOAD_REQUEST } from '../reducers/photo';
import dataURLtoFile from "../hooks/dataURLtoFile";
import hashFile from '../hooks/hashFile';

const Wrapper = styled.div`
  width: 30%;
  margin : 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  text-align: center;
  height: 270px;
  position: relative;
  top: 40%;
  transform: translateY(-40%);
  border-radius: 10px;
  z-index: 100;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -35%);
`;

const Button = styled.button`
color: white;
  background-color: #b153be;
  width: 80%;
  height: 45%;
  border: none;
  border-radius: 5px;
  z-index: 101;
`;

const Upload = () => {
  const { imageUrl } = useSelector((state) => state.photo);
  const { me } = useSelector((state) => state.user);
  const { imageSrc } = imageUrl;
  // moment.locale('kr');
  // const createdAt = moment();
  // const fileCreated = moment(createdAt).format();
  // const file = dataURLtoFile(imageSrc, me ? me.name + fileCreated : `alan${fileCreated}.jpeg`);
  // const hash = hashFile(file);
  const creator = me ? me.name : "생성자";
  const dispatch = useDispatch();

  const cancleCapture = useCallback(
    () => {
      console.log("cancle");
      dispatch({
        type: CANCLE_CAPTURE_REQUEST,
      });
      Router.push('/camera');
    },
    [],
  );

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log("onsubmit1");
    navigator.geolocation.getCurrentPosition((position) => {
      const tempLatitude = position.coords.latitude;
      const tempLongitude = position.coords.longitude;
      console.log(tempLatitude);
      dispatch({
        type: UPLOAD_REQUEST,
        data: {
          imageSrc,
          latitude: tempLatitude,
          longitude: tempLongitude,
          creator,
        },
      });
      Router.push('/completeUpload');
    },
    (error) => {
      console.log(error);
    }, { maximumAge: 60000, enableHighAccuracy: true, timeout: 10000 });
  }, []);

  return (
    <>
      <AppLayout title="업로드선택">
        {imageUrl ? <img src={imageUrl.imageSrc} alt="" width="100%" height="100%" /> : null}
        <form onSubmit={onSubmitForm}>
          <Wrapper>
            <Button onClick={cancleCapture}>취소</Button>
            <Button htmlType="submit">업로드</Button>
          </Wrapper>
        </form>
      </AppLayout>
    </>
  );
};

export default Upload;
