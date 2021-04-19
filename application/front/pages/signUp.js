import styled from 'styled-components';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';

import { SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const Wrapper = styled.div`
  text-align : center;
`;

const SignUpInput = styled.input`
  border: 1px solid #b153be;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  height: 35px;
  margin : 10px auto;
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
    width: 80%;
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

const SignUp = () => {
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [loginId, onChangeLoginId] = useInput('');
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [workIn, onChangeWorkIn] = useInput('소속을 선택해주세요.');
  const [workInDetail, onChangeWorkInDetail] = useInput('상세소속을 선택해주세요.');
  const [field, onChangeField] = useInput('현장을 선택해주세요.');
  const [project, onChangeProject] = useInput('프로젝트를 선택해주세요.');

  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      alert('메인페이지로 이동합니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        loginId,
        password,
        email,
        name,
        workIn,
        workInDetail,
        field,
        project,
      },
    });
  }, [loginId, email, password, passwordCheck, name, workIn, workInDetail, field, project]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  return (
    <AppLayout title="회원가입">
      <Wrapper>
        <div style={{ paddingTop: 20, height: 30 }} />
        <form onSubmit={onSubmitForm}>
          <SignUpInput type="text" value={loginId} placeholder="ID를 입력하세요" onChange={onChangeLoginId} required />
          <SignUpInput type="password" value={password} placeholder="PW를 입력하세요" onChange={onChangePassword} required />
          <SignUpInput type="password" value={passwordCheck} placeholder="PW를 확인하세요" onChange={onChangePasswordCheck} required />
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          <SignUpInput type="text" value={name} placeholder="이름을 입력하세요" onChange={onChangeName} required />
          <SignUpInput type="email" value={email} placeholder="이메일을 입력해주세요" onChange={onChangeEmail} required />
          <CreateSelect onChange={onChangeWorkIn} required>
            <option value="" hidden>소속을 선택해주세요.</option>
            <option value="점검기관">점검기관</option>
            <option value="발주자">발주자</option>
            <option value="원도급자">원도급자</option>
            <option value="하도급자">하도급자</option>
          </CreateSelect>
          <CreateSelect onChange={onChangeWorkInDetail} required>
            <option value="" hidden>상세소속을 선택해주세요.</option>
            {workIn === "점검기관" ? <option value="고용노동부(테스트)">고용노동부(테스트)</option> : null}
            {workIn === "점검기관" ? <option value="한국산업안전보건공단(테스트)">한국산업안전보건공단(테스트)</option> : null}
            {workIn === "점검기관" ? <option value="국토교통부(테스트)">국토교통부(테스트)</option> : null}
            {workIn === "점검기관" ? <option value="동작구청(테스트)">동작구청(테스트)</option> : null}
            {workIn === "발주자" ? <option value="공공기관(테스트)">공공기관(테스트)</option> : null}
            {workIn === "발주자" ? <option value="주식회사 ㅇㅇㅇ(테스트)">주식회사 ㅇㅇㅇ(테스트)</option> : null}
            {workIn === "원도급자" ? <option value="중앙대학교(테스트)">중앙대학교(테스트)</option> : null}
            {workIn === "원도급자" ? <option value="주식회사 ㅇㅇㅇ(테스트)">주식회사 △△△(테스트)</option> : null}
            {workIn === "하도급자" ? <option value="주식회사 반도(테스트)">주식회사 반도(테스트)</option> : null}
            {workIn === "하도급자" ? <option value="주식회사 ㅁㅁㅁ(테스트)">주식회사 ㅁㅁㅁ(테스트)</option> : null}
          </CreateSelect>
          <CreateSelect onChange={onChangeField} required>
            <option value="" hidden>현장을 선택해주세요.</option>
            <option value="중앙대학교 2층 옥상(테스트)">중앙대학교 2층 옥상(테스트)</option>
            <option value="동작구 ㅇㅇ공공주택 신축공사(테스트)">동작구 ㅇㅇ공공주택 신축공사(테스트)</option>
          </CreateSelect>
          <CreateSelect onChange={onChangeProject} required>
            <option value="" hidden>공종을 선택해주세요.</option>
            <option value="철근콘크리트공사">철근콘크리트공사</option>
            <option value="비계공사">비계공사</option>
            <option value="도장공사">도장공사</option>
            <option value="외장판넬공사">공사</option>
            <option value="조적공사">조적공사</option>
            <option value="미장공사">미장공사</option>
            <option value="방수공사">방수공사</option>
            <option value="수장공사">수장공사</option>

          </CreateSelect>
          <Button htmlType="submit" loading={isSigningUp}>회원가입완료</Button>
        </form>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUp;
