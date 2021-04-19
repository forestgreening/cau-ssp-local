import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import Title from '../components/Title';
import SmallButton from '../components/SmallButton';
import { loginRequestAction, LOG_IN_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const FlexWrapper = styled.div`
  display: flex;
  justify-content : center;
`;

const BigButton = styled.button`
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 80%;
  height: 50px;
  margin : 10px auto;
  background-color: white;
  color: #b153be;
  z-index: 101;
`;

const Button = styled.button`
color: white;
  background-color: #b153be;
  width: 80%;
  height: 45%;
  border: none;
  border-radius: 5px;
  z-index: 101;
`;

const LoginButton = styled.input.attrs({
  type: 'submit',
  value: '로그인하기',
})`
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 80%;
  height: 50px;
  margin : 10px auto;
  background-color: white;
  color: #b153be;
`;

const LoginButtonA = styled.a`
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 80%;
  height: 50px;
  margin : 10px auto;
  background-color: white;
  color: #b153be;
  z-index: 9999;
`;

const SmallButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const CreateInput = styled.input`
  border: 1px solid #b153be;
  border-radius: 30px;
  text-align: center;
  width: 80%;
  height: 50px;
  margin : 10px auto;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const { logInError } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.user);
  const [loginId, onChangeLoginId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const { register, handleSubmit } = useForm();
  const onSubmit = (d) => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        loginId: d.loginId,
        password: d.password,
      },
    });
  };

  const onSubmitForm = useCallback((e) => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        loginId: e.loginId,
        password: e.password,
      },
    });
    if (me) {
      Router.push('/fieldList');
    }
  }, []);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  return (
    <AppLayout title="로그인">
      <Title />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FlexWrapper>
          <CreateInput placeholder="ID를 입력하세요." {...register("loginId", { required: true })} />
        </FlexWrapper>
        <FlexWrapper>
          <CreateInput placeholder="PW를 입력하세요." type="password" {...register("password", { required: true })} />
        </FlexWrapper>
        <FlexWrapper>
          <LoginButton />
        </FlexWrapper>
      </form>
      <SmallButtonWrapper>
        <SmallButton text="ID/PW 찾기" />
        <Link href="/signUp"><SmallButton text="회원가입" /></Link>
      </SmallButtonWrapper>
    </AppLayout>
  );
};

export default SignIn;
