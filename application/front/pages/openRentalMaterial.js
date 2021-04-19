import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import MaterialDiv from '../components/MaterialDiv';

const OpenRentalMaterial = () => {
  const { rentalMaterial } = useSelector((state) => state.material);
  const value = "정보 없음";
  const date = rentalMaterial[0] ? String(rentalMaterial[0].date).substring(0, 10) : null;

  console.log(date);
  return (
    <AppLayout title="자재정보열람(임대업체)">
      <MaterialDiv text="설계정보" info={rentalMaterial[0] ? rentalMaterial[0].fileName : value} />
      <MaterialDiv text="계약물량" info={rentalMaterial[0] ? `${rentalMaterial[0].contractQuantity}m2` : value} />
      <MaterialDiv text="발주업체명" info={rentalMaterial[0] ? rentalMaterial[0].companyName : value} />
      <MaterialDiv text="발주수량" info={rentalMaterial[0] ? `${rentalMaterial[0].quantity}m2` : value} />
      <MaterialDiv text="발주일시" info={rentalMaterial[0] ? date : value} />
    </AppLayout>
  );
};

export default OpenRentalMaterial;
