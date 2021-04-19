import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import AppLayout from '../../components/AppLayout';

const ImageWrapper = styled.div`
  width: 100%;
  margin : 0 auto;
  margin-top : 20px;
  text-align : center;
`;

const TextWrapper = styled.div`
  width: 300px;
  height: 250px;
  margin: 0 auto;
  margin-top: 20px;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RightArea = styled.div`
line-height: 25px;
  font-size: 17px;
  width: 150px;
  height: 25px;
  background-color: #BFC7CF;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const RightAreaLocation = styled.div`
line-height: 25px;
  font-size: 18px;
  width: 150px;
  height: 50px;
  background-color: #BFC7CF;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const RightAreaHash = styled.div`
  font-size: 14px;
  width: 150px;
  height: 65px;
  background-color: #BFC7CF;
  border: none;
  border-radius: 5px;
  text-align: center;
  word-break: break-all;
  line-height: 1.15;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #b153be;
  color: white;
  width: 120px;
  height: 30px;
  margin: 0 auto;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
`;

const PhotoDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photo);
  const { id } = router.query;
  moment.locale('ko');
  const date = moment(photos[id].createdAt).format('LLL');

  return (
    <AppLayout title="상세사진정보">
      <ImageWrapper>
        <img src={photos[id].imageUrl} width="330" height="250" alt={id} />
      </ImageWrapper>
      <TextWrapper>
        <RowWrapper><p style={{ fontSize: "17px" }}>날짜/시간</p><RightAreaLocation>{date}</RightAreaLocation></RowWrapper>
        <RowWrapper><p style={{ fontSize: "17px" }}>위치정보</p><RightAreaLocation>{`위도 : ${photos[id].latitude.toFixed(2)}`}<br />{`경도 : ${photos[id].longitude.toFixed(2)}`}</RightAreaLocation></RowWrapper>
        <RowWrapper><p style={{ fontSize: "17px" }}>생성자정보</p><RightArea>{photos[id].creator}</RightArea></RowWrapper>
        <RowWrapper><p style={{ fontSize: "17px" }}>해시값</p><RightAreaHash>{photos[id].hash}</RightAreaHash></RowWrapper>
      </TextWrapper>
      <ButtonWrapper>
        <Link href="http://localhost:8080/#/transactions"><Button>블록정보 확인</Button></Link>
      </ButtonWrapper>
    </AppLayout>
  );
};

export default PhotoDetail;
