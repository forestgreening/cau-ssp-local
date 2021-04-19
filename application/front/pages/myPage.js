import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 95%;
  height: 95%;
  background-color: white;
  border: 1px solid #b153be;
  border-radius: 7px;
`;

const ImageContainer = styled.div`
  width: 92%;
  height: 250px;
  background-color: white;
  border: 1px solid #b153be;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 50px;
`;

const P = styled.p`
  font-size: 20px;
`;

const Mypage = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <AppLayout title="마이페이지">
      <Wrapper>
        <Container>
          <ImageContainer>
            <UserOutlined style={{ fontSize: '1500%' }} />
          </ImageContainer>
          <TextContainer>
            <P>이름 : {me ? me.name : null}</P>
            <P>ID : {me ? me.loginId : null}</P>
            <P>소속 : {me ? `${me.workInDetail} ${me.workIn}` : null}</P>
            <P>참여 건설현장 : {me ? me.field : null}</P>
            <P>참여 프로젝트 : {me ? me.project : null}</P>
          </TextContainer>
        </Container>
      </Wrapper>
    </AppLayout>
  );
};

export default Mypage;
