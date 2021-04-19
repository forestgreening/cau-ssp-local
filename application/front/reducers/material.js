import produce from '../util/produce';

export const initialState = {
  orderMaterial: [],
  rentalMaterial: [],
  inputOrderMaterialLoading: false,
  inputOrderMaterialDone: false,
  inputOrderMaterialError: null,
  inputRentalMaterialLoading: false,
  inputRentalMaterialDone: false,
  inputRentalMaterialError: null,
  loadMaterialLoading: false,
  loadMaterialDone: false,
  loadMaterialError: null,
  isReadedLoading: false,
  isReadedDone: false,
  isReadedError: null,
  isReadedUpdateLoading: false,
  isReadedUpdateDone: false,
  isReadedUpdateError: null,
  isReaded: null,
  material: null,
};

export const INPUT_ORDER_MATERIAL_REQUEST = 'INPUT_ORDER_MATERIAL_REQUEST';
export const INPUT_ORDER_MATERIAL_SUCCESS = 'INPUT_ORDER_MATERIAL_SUCCESS';
export const INPUT_ORDER_MATERIAL_FAILURE = 'INPUT_ORDER_MATERIAL_FAILURE';

export const INPUT_RENTAL_MATERIAL_REQUEST = 'INPUT_RENTAL_MATERIAL_REQUEST';
export const INPUT_RENTAL_MATERIAL_SUCCESS = 'INPUT_RENTAL_MATERIAL_SUCCESS';
export const INPUT_RENTAL_MATERIAL_FAILURE = 'INPUT_RENTAL_MATERIAL_FAILURE';

export const LOAD_MATERIAL_REQUEST = 'LOAD_MATERIAL_REQUEST';
export const LOAD_MATERIAL_SUCCESS = 'LOAD_MATERIAL_SUCCESS';
export const LOAD_MATERIAL_FAILURE = 'LOAD_MATERIAL_FAILURE';

export const IS_READED_CHECK_REQUEST = 'IS_READED_CHECK_REQUEST';
export const IS_READED_CHECK_SUCCESS = 'IS_READED_CHECK_SUCCESS';
export const IS_READED_CHECK_FAILURE = 'IS_READED_CHECK_FAILURE';

export const IS_READED_UPDATE_REQUEST = 'IS_READED_UPDATE_REQUEST';
export const IS_READED_UPDATE_SUCCESS = 'IS_READED_UPDATE_SUCCESS';
export const IS_READED_UPDATE_FAILURE = 'IS_READED_UPDATE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case INPUT_ORDER_MATERIAL_REQUEST:
      draft.inputOrderMaterialLoading = true;
      draft.inputOrderMaterialDone = false;
      draft.inputOrderMaterialError = null;
      break;
    case INPUT_ORDER_MATERIAL_SUCCESS:
      draft.inputOrderMaterialLoading = false;
      draft.inputOrderMaterialDone = true;
      draft.orderMaterial.unshift(action.data);
      break;
    case INPUT_ORDER_MATERIAL_FAILURE:
      draft.inputOrderMaterialLoading = false;
      draft.inputOrderMaterialError = action.error;
      break;
    case INPUT_RENTAL_MATERIAL_REQUEST:
      draft.inputRentalMaterialLoading = true;
      draft.inputRentalMaterialDone = false;
      draft.inputRentalMaterialError = null;
      break;
    case INPUT_RENTAL_MATERIAL_SUCCESS:
      draft.inputRentalMaterialLoading = false;
      draft.inputRentalMaterialDone = true;
      draft.rentalMaterial.unshift(action.data);
      break;
    case INPUT_RENTAL_MATERIAL_FAILURE:
      draft.inputRentalMaterialLoading = false;
      draft.inputRentalMaterialError = action.error;
      break;
    case LOAD_MATERIAL_REQUEST:
      draft.loadMaterialLoading = true;
      draft.loadMaterialDone = false;
      draft.loadMaterialError = null;
      break;
    case LOAD_MATERIAL_SUCCESS:
      draft.loadMaterialLoading = false;
      draft.material = action.data;
      draft.loadMaterialDone = true;
      break;
    case LOAD_MATERIAL_FAILURE:
      draft.loadMaterialLoading = false;
      draft.loadMaterialError = action.error;
      break;
    case IS_READED_CHECK_REQUEST:
      draft.isReadedLoading = true;
      draft.isReadedDone = false;
      draft.isReadedError = null;
      break;
    case IS_READED_CHECK_SUCCESS:
      draft.isReadedLoading = false;
      draft.isReaded = action.data;
      draft.isReadedDone = true;
      break;
    case IS_READED_CHECK_FAILURE:
      draft.isReadedLoading = false;
      draft.isReadedError = action.error;
      break;
    case IS_READED_UPDATE_REQUEST:
      draft.isReadedUpdateLoading = true;
      draft.isReadedUpdateDone = false;
      draft.isReadedUpdateError = null;
      break;
    case IS_READED_UPDATE_SUCCESS:
      draft.isReadedUpdateLoading = false;
      draft.isReaded = action.data;
      draft.isReadedUpdateDone = true;
      break;
    case IS_READED_UPDATE_FAILURE:
      draft.isReadedUpdateLoading = false;
      draft.isReadedUpdateError = action.error;
      break;

    default:
      break;
  }
});

export default reducer;
