import { Card } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';

const { Meta } = Card;

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
  width: 165px;
  height: 165px;
  background-image: url("https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F2e%2F6b%2F88%2F2e6b8836ec4d4542fe75d668786a49ba.jpg&type=sc960_832");
  background-size: cover;
  background-position: center;
`;

const fieldList = () => {
  return (
    <AppLayout title="현장 리스트">
      <Grid>
        <Link href="/projectList"><FiledFirst>동작구 오피스텔 신축현장 A</FiledFirst></Link>
        <FiledFirst>동작구 오피스텔 신축현장 B</FiledFirst>
        <FiledFirst>용산구 행복주택 신축현장 C</FiledFirst>
        <FiledFirst style={{ backgroundImage: "none", backgroundColor: "white", alignItems: "center" }}>...</FiledFirst>

      </Grid>
    </AppLayout>
  );
};

export default fieldList;
