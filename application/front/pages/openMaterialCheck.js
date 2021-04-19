import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import OpenMaterialForm from '../components/OpenMaterialForm';

const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    height: 100px;
    background-color: white;
    border-radius: 10px;
    vertical-align: middle;
    display: flex;
    align-items: center;
`;

const P = styled.p`
    font-size: 14px;
    margin: 0;
    margin-left: 10px;
    line-height: 1.32;
`;

const OpenMaterialCheck = () => {
  const { orderMaterial, rentalMaterial } = useSelector((state) => state.material);

  const result = orderMaterial[0] && rentalMaterial[0] && orderMaterial[0].quantity === rentalMaterial[0].quantity ? "일치" : "불일치";
  const date = orderMaterial[0] && rentalMaterial[0] ? String(rentalMaterial[0].date).substring(0, 10) : null;
  const field = "용산구 청년주택 신축현장 A";
  const project = "비계 조달, 설치";
  return (
    <AppLayout title="자재정보열람(시스템관리)">
      {orderMaterial[0] && rentalMaterial[0] ? <OpenMaterialForm result={result || null} date={date || null} field={field || null} project={project || null} /> : null}
    </AppLayout>
  );
};

export default OpenMaterialCheck;
