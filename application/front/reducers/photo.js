import produce from '../util/produce';

export const initialState = {
  imageUrl: '',
  imageUrlList: [],
  photos: [],
  captureLoading: false,
  captureDone: false,
  captureError: null,
  cancleCaptureLoading: false,
  cancleCaptureDone: false,
  cancleCaptureError: null,
  uploadLoading: false,
  uploadDone: false,
  uploadError: null,
  loadPhotosLoading: false,
  loadPhotosDone: false,
  loadPhotosError: null,
};

export const CAPTURE_REQUEST = 'CAPTURE_REQUEST';
export const CAPTURE_SUCCESS = 'CAPTURE_SUCCESS';
export const CAPTURE_FAILURE = 'CAPTURE_FAILURE';

export const CANCLE_CAPTURE_REQUEST = 'CANCLE_CAPTURE_REQUEST';
export const CANCLE_CAPTURE_SUCCESS = 'CANCLE_CAPTURE_SUCCESS';
export const CANCLE_CAPTURE_FAILURE = 'CANCLE_CAPTURE_FAILURE';

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const LOAD_PHOTOS_REQUEST = 'LOAD_PHOTOS_REQUEST';
export const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS';
export const LOAD_PHOTOS_FAILURE = 'LOAD_PHOTOS_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case CAPTURE_REQUEST:
      draft.captureLoading = true;
      draft.captureDone = false;
      draft.captureError = null;
      break;
    case CAPTURE_SUCCESS:
      draft.captureLoading = false;
      draft.captureDone = true;
      draft.cancleCaptureDone = false;
      draft.imageUrl = action.data;
      break;
    case CAPTURE_FAILURE:
      draft.captureLoading = false;
      draft.captureError = action.error;
      break;
    case CANCLE_CAPTURE_REQUEST:
      draft.cancleCaptureLoading = true;
      draft.cancleCaptureDone = false;
      draft.cancleCaptureError = null;
      break;
    case CANCLE_CAPTURE_SUCCESS:
      draft.cancleCaptureLoading = false;
      draft.captureDone = false;
      draft.cancleCaptureDone = true;
      draft.imageUrl = null;
      break;
    case CANCLE_CAPTURE_FAILURE:
      draft.cancleCaptureLoading = false;
      draft.cancleCaptureError = action.error;
      break;
    case UPLOAD_REQUEST:
      draft.uploadLoading = true;
      draft.uploadDone = false;
      draft.uploadError = null;
      draft.captureDone = false;
      break;
    case UPLOAD_SUCCESS:
      draft.uploadLoading = false;
      draft.uploadDone = true;
      draft.photos.unshift({
        imageUrl: action.data.imageUrl,
        fileName: action.data.fileName,
        createdAt: action.data.createdAt,
        latitude: action.data.latitude,
        longitude: action.data.longitude,
        creator: action.data.creator,
        hash: action.data.hash,
      });
      break;
    case UPLOAD_FAILURE:
      draft.uploadLoading = false;
      draft.uploadError = action.error;
      break;
    case LOAD_PHOTOS_REQUEST:
      draft.loadPhotosLoading = true;
      draft.loadPhotosDone = false;
      draft.loadPhotosError = null;
      break;
    case LOAD_PHOTOS_SUCCESS:
      draft.loadPhotosLoading = false;
      draft.loadPhotosDone = true;
      draft.photos = action.data;
      break;
    case LOAD_PHOTOS_FAILURE:
      draft.loadPhotosLoading = false;
      draft.loadPhotosError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
