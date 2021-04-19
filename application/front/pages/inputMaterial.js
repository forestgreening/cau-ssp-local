import styled from 'styled-components';
import React, {
  useState, useCallback, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import Value from '../components/Value';
import useInput from '../hooks/useInput';
import { INPUT_ORDER_MATERIAL_REQUEST } from '../reducers/material';

const Label = styled.label`
padding: 8px 20.5vw;
background : white;
border: 1px solid #b153be;
border-radius: 10px;
text-align: center;
width: 80%;
height: 35px;
margin : 10px auto;
`;

const FileButton = styled.button`
padding: 8px 20.5vw;
background : white;
border: 1px solid #b153be;
border-radius: 10px;
text-align: center;
width: 80%;
height: 35px;
margin : 0 auto;
`;

const Wrapper = styled.div`
  text-align : center;
`;

const StyledLink = styled(Link)`
  color: white;
`;

const StyledA = styled.a`
  color:white;
`;

const MaterialInput = styled.input`
  border: 1px solid #b153be;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  height: 35px;
  margin : 15px auto;
`;

const AmountInput = styled.input`
border: 1px solid #b153be;
border-radius: 10px;
text-align: center;
width: 80%;
height: 35px;
margin : 15px auto;
`;

const InputWrapper = styled.div`
margin: 0 auto;
width: 83%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  margin-top : 15px;
  color: white;
  background-color: #b153be;
  border: none;
  border-radius: 10px;
  width: 40%;
  height: 40px;
  cursor: pointer;
`;

const CreateSelect = styled.select`
    border: 1px solid #b153be;
    border-radius: 10px;
    text-align-last: center;
    width: 15%;
    height: 35px;
    margin : 10px auto;
    background: white;
        option {
            text-align: center;
            color: black;
            background: white;
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
          }
`;

const DateInput = styled.input.attrs({
  type: 'date',
})`
border: 1px solid #b153be;
border-radius: 10px;
text-align: center;
width: 80%;
height: 35px;
margin : 15px auto;
::before {
  content:attr(data-placeholder);width:100%
}
:focus::before,
:valid::before {
  display: none;
}
`;

const InputMaterial = () => {
  const [file, setFile] = useState('');
  const [contract, onChangeContract] = useInput('');
  const [orderingCompany, onChangeOrderingCompany] = useInput('');
  const [order, onChangeOrder] = useInput('');
  const [date, onChangeDate] = useInput('');
  const [contractUnit, onChangeContractUnit] = useInput('소속을 선택해주세요.');
  const [orderUnit, onChangeOrderUnit] = useInput('상세소속을 선택해주세요.');
  const dispatch = useDispatch();
  const fileInput = useRef();

  const { inputOrderMaterialDone } = useSelector((state) => state.material);

  const onClickFileUpload = useCallback(() => {
    fileInput.current.click();
  }, [fileInput.current]);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    const fileName = file.name;
    dispatch({
      type: INPUT_ORDER_MATERIAL_REQUEST,
      data: {
        fileName,
        contract,
        orderingCompany,
        order,
        date,
      },
    });
    Router.push('/procureManagement');
  }, [date, contract, orderingCompany, order, file]);

  const onChangeFile = useCallback((e) => {
    setFile(e.target.files[0]);
  });

  return (
    <AppLayout title="자재정보입력(시공사)">
      <Wrapper>
        <div style={{ paddingTop: 100, height: 30 }} />
        <form onSubmit={onSubmitForm}>
          {/* <Label htmlFor="input-file">{value}</Label> */}
          {/* <input type="file" id="input-file" accept=".pdf" ref={fileInput} style={{ display: "none" }} onChange={onChangeFile} /><br /> */}

          <input type="file" accept=".pdf" ref={fileInput} onChange={onChangeFile} hidden required />
          <FileButton onClick={onClickFileUpload}>{file ? file.name : <Value />}</FileButton>
          <InputWrapper>
            <AmountInput type="number" value={contract} placeholder="계약물량을 입력해 주세요" onChange={onChangeContract} style={{ marginTop: 35 }} required />
            <CreateSelect style={{ marginTop: 35 }} onChange={onChangeContractUnit}>
              <option value="" hidden>m2</option>
              <option value="m2">m2</option>
              <option value="m3">m3</option>
              <option value="EA">EA</option>
            </CreateSelect>
          </InputWrapper>
          <MaterialInput type="text" value={orderingCompany} placeholder="발주업체명을 입력해주세요" onChange={onChangeOrderingCompany} required />
          <InputWrapper>
            <AmountInput type="number" value={order} placeholder="발주수량을 입력해 주세요" onChange={onChangeOrder} />
            <CreateSelect style={{ marginTop: 15 }} onChange={onChangeOrderUnit}>
              <option value="" hidden>m2</option>
              <option value="m2">m2</option>
              <option value="m3">m3</option>
              <option value="EA">EA</option>
            </CreateSelect>
          </InputWrapper>
          <DateInput
            type="date"
            value={date}
            data-placeholder="발주일시를 입력해주세요"
            onChange={onChangeDate}
            style={{ backgroundColor: "white" }}
            required="true"
          />
          <Button htmlType="submit">입력완료</Button>
        </form>
      </Wrapper>
    </AppLayout>
  );
};

export default InputMaterial;
