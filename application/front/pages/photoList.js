import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';

const PhotoList = () => {
  const { photos } = useSelector((state) => state.photo);

  return (
    <AppLayout title="사진 리스트">
      {photos.map((v, i) => (
        <div key={v.imageUrl} style={{ display: 'inline-block' }}>
          {v.imageUrl ? <Link href={`photoDetail/${i}`}><img src={v.imageUrl} width="125" height="150" alt={i} /></Link> : null}
        </div>
      ))}
    </AppLayout>
  );
};

export default PhotoList;
