import styled, { createGlobalStyle } from 'styled-components';
import Webcam from 'react-webcam';
import { InstagramOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import { CAPTURE_REQUEST } from '../reducers/photo';

const Global = createGlobalStyle`
  video {
    width: 100%;
    height: 100%;
  }
`;

const Canvas = styled.div`
width: 95%;
height: 98%;
    margin: 0 auto;
    margin-top: 5px;
    text-align : center;
    display: block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
`;

const Button = styled.button`
  
`;

const Camera = () => {
  const dispatch = useDispatch();
  const { captureDone } = useSelector((state) => state.photo);

  const WebcamComponent = () => <Webcam />;
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      return dispatch({
        type: CAPTURE_REQUEST,
        data: {
          imageSrc,
        },
      });
    },
    [webcamRef],
  );

  useEffect(() => {
    if (captureDone === true) {
      Router.push('/upload');
    }
  }, [captureDone]);

  const videoConstraints = {
    // facingMode: { exact: "environment" },
    facingMode: 'user',
  };
  return (
    <AppLayout title="촬영하기">
      <Global />
      <Webcam
        audio={false}
        height={`${80}%`}
        width={`${100}%`}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ marginTop: "10px" }}
      />
      <ButtonWrapper>
        <Button onClick={capture}><InstagramOutlined /></Button>
      </ButtonWrapper>
    </AppLayout>
  );
};

export default Camera;
