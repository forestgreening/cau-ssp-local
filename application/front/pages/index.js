import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import SignIn from './signIn';
import FieldList from './fieldList';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_MATERIAL_REQUEST } from '../reducers/material';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { photos } = useSelector((state) => state.photo);
  const { material } = useSelector((state) => state.material);

  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, [me && me.id]);

  useEffect(() => {
    if (!material) {
      dispatch({
        type: LOAD_MATERIAL_REQUEST,
      });
    }
  }, [material]);

  // useEffect(() => {
  //   if (!photos[0]) {
  //     dispatch({
  //       type: LOAD_PHOTOS_REQUEST,
  //     });
  //   }
  // }, [photos]);

  return (
    <>
      {me ? <FieldList /> : <SignIn />}
    </>
  );
};

export default Home;
