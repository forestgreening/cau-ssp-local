import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';

const Wrapper = styled.div`
width: 40%;
  margin : 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  text-align: center;
  height: 290px;
  position: relative;
  top: 40%;
  transform: translateY(-40%);
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #b153be;
  width: 90%;
  height: 48%;
  border: none;
  border-radius: 5px;
`;

const InstallManagement = () => (
  <AppLayout title="설치관리">
    <Wrapper>
      <Link href="camera"><Button>촬영하기</Button></Link>
      <Link href="photoList"><Button>사진정보<br />열람하기</Button></Link>
    </Wrapper>
  </AppLayout>
);

export default InstallManagement;
