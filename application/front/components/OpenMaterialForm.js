import styled from 'styled-components';

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

const OpenMaterialForm = (data) => {
  console.log(data);
  return (
    <Wrapper>
      <div>
        <P>판별결과 : <span style={{ color: data.result === "일치" ? "blue" : "red" }}>{data.result}</span></P>
        <P>일시 : {data.date}</P>
        <P>현장 : {data.field}</P>
        <P>프로젝트 : {data.project}</P>
      </div>
    </Wrapper>
  );
};

export default OpenMaterialForm;
