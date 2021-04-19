import React, { useCallback } from 'react';
import styled from 'styled-components';

const CreateSelect = styled.select`
    border: 1px solid #b153be;
    border-radius: 10px;
    text-align: center;
    width: 80%;
    height: 35px;
    margin : 10px auto;
    background: white;
        option {
            color: black;
            background: white;
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
          }
`;

const Select = (children) => {
  return (
    <CreateSelect>{children}
  );
};

export default Select;
