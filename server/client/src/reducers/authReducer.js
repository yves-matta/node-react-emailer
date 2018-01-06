import { FETCH_USER } from '../actions/types';

export const initialState = null;

export default (state = initialState, action) => {
  if (action.type === FETCH_USER) {
    return action.payload || false;
  }

  return state;
};
