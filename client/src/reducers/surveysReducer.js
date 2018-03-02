import { FETCH_SURVEYS } from '../actions/types';

export const initialState = [];

export default (state = initialState, action) => {
  if (action.type === FETCH_SURVEYS) {
    return action.payload || false;
  }

  return state;
};
