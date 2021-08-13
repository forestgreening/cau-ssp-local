import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MATERIAL_REQUEST, IS_READED_UPDATE_REQUEST } from '../reducers/material';
import AppLayout from '../components/AppLayout';
import OpenMaterialForm from '../components/OpenMaterialForm';

const OpenMaterialManager = () => {
  const dispatch = useDispatch();
  const { material } = useSelector((state) => state.material);

  useEffect(() => {
    if (!material) {
      dispatch({
        type: LOAD_MATERIAL_REQUEST,
      });
      dispatch({
        type: IS_READED_UPDATE_REQUEST,
      });
    }
  }, [material]);

  const result = material[0] ? material[0].match : null;
  const date = material[0] ? material[0].date.substring(0, 10) : null;
  const field = "용산구 청년주택 신축현장 A";
  const project = "비계 조달, 설치";
  return (
    <AppLayout title="자재정보열람(점검기관)">
      {material[0] ? <OpenMaterialForm result={result || null} date={date || null} field={field || null} project={project || null} /> : <OpenMaterialForm />}
    </AppLayout>
  );
};

export default OpenMaterialManager;
