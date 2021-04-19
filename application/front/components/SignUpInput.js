import React, { useCallback } from 'react';
import styled from 'styled-components';

const CreateSignUpInput = styled.input`
  border: 1px solid #b153be;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  height: 35px;
  margin : 10px auto;
`;

const SignUpInput = (arg) => {
  return (
    <CreateSignUpInput placeholder={`${arg.text} 입력하세요.`} />
  );
};

export default SignUpInput;
