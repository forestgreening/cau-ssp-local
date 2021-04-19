import styled from 'styled-components';

const MaterialWrapper = styled.div`
  padding-top: 30px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin : 0 auto;
  position: relative;
  top: 15%;
  transform: translateY(-15%);
`;

const MaterialText = styled.div`
  font-size: 14;
`;

const MaterialInfo = styled.div`
  border: 1px solid #b153be;
  border-radius: 10px;
  text-align: center;
  width: 70%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const MaterialDiv = (data) => {
  console.log(data.text, data.info);
  return (
    <MaterialWrapper>
      <MaterialText>{data.text}</MaterialText>
      <MaterialInfo>{data.info}</MaterialInfo>
    </MaterialWrapper>
  );
};

export default MaterialDiv;
