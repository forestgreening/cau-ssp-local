import React, { useCallback } from 'react';
import styled from 'styled-components';

const CreateBigButton = styled.button`
  cursor: pointer;
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 80%;
  height: 50px;
  margin : 10px auto;
  background-color: white;
  color: #b153be;
`;

const BigButton = ({ text, ...rest }) => {
  return (
    <CreateBigButton {...rest}>{text}</CreateBigButton>
  );
};

export default BigButton;
