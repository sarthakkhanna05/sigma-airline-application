

import { Loader } from './ActionTypes';


export const trackLoader = (action, active) => ({ type: Loader.TRACK_LOADER, payload: { action, active } });

export const openModal = (payload) => {
    return (dispatch) => {
        dispatch({ type: Loader.OPEN_MODAL, payload });
    }
}