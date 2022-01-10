import { Loader } from '../actions/ActionTypes';

const defaultState = {
  modal: {
    open: false,
    header: '',
    body: ''
  }
}

export default function LoaderReducer(state = defaultState, action) {
  switch (action.type) {
    case Loader.TRACK_LOADER:
      return Object.assign({}, state, { [action.payload.action]: action.payload.active });
    case Loader.OPEN_MODAL:
      return Object.assign({}, state, { modal: { ...action.payload } });
    default:
      return state;
  }
}