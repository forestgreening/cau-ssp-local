import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import MaterialDiv from '../components/MaterialDiv';

const OpenMaterial = () => {
  const { orderMaterial } = useSelector((state) => state.material);
  const value = "정보 없음";
  const date = orderMaterial[0] ? String(orderMaterial[0].date).substring(0, 10) : null;
  return (
    <AppLayout title="자재정보열람(시공사)">
      <MaterialDiv text="설계정보" info={orderMaterial[0] ? orderMaterial[0].fileName : value} />
      <MaterialDiv text="계약물량" info={orderMaterial[0] ? orderMaterial[0].contractQuantity : value} />
      <MaterialDiv text="발주업체명" info={orderMaterial[0] ? orderMaterial[0].companyName : value} />
      <MaterialDiv text="발주수량" info={orderMaterial[0] ? orderMaterial[0].quantity : value} />
      <MaterialDiv text="발주일시" info={orderMaterial[0] ? date : value} />
    </AppLayout>
  );
};

export default OpenMaterial;
