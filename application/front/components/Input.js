import React, { useCallback } from 'react';
import styled from 'styled-components';

const CreateInput = styled.input`
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 80%;
  height: 50px;
  margin : 10px auto;
`;

const Input = (arg) => {
  return (
    <CreateInput placeholder={`${arg.text} 입력하세요.`} />
  );
};

export default Input;
