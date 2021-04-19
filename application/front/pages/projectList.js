import { Card } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';

const Grid = styled.div`
  margin: 0 auto;
  width: 350px;
  display: grid;
  grid-template-columns: repeat(2, 175px);
  grid-gap: 10px;
  position: relative;
  top: 30%;
  transform: translateY(-30%);
  text-align: center;
  vertical-align: center;
`;

const FiledFirst = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 165px;
  background-color: #b153be;
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

const projectList = () => {
  return (
    <AppLayout title="현장 리스트">
      <Grid>
        <Link href="/procureManagement"><FiledFirst>비계 <br />조달관리</FiledFirst></Link>
        <Link href="/installManagement"><FiledFirst>비계 <br />설치관리</FiledFirst></Link>
        <FiledFirst style={{
          backgroundImage: "none", backgroundColor: "white", alignItems: "center", color: "black",
        }}
        >...
        </FiledFirst>
        <FiledFirst style={{
          backgroundImage: "none", backgroundColor: "white", alignItems: "center", color: "black",
        }}
        >...
        </FiledFirst>

      </Grid>
    </AppLayout>
  );
};

export default projectList;
