import React, { useCallback } from 'react';
import styled from 'styled-components';

const CreateSmallButton = styled.button`
  cursor: pointer;
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 30%;
  height: 35px;
  margin : 10px auto;
  background-color: white;
  color: #b153be;
`;

const SmallButton = ({ text, ...rest }) => {
  return (
    <CreateSmallButton {...rest}>{text}</CreateSmallButton>
  );
};

export default SmallButton;
