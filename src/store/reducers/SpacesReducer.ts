import {IS_LOADING, ADD_SPACE, DELETE_SPACE} from '../ActionTypes';
import {SpaceType} from '../../types';

const initialState = {
  isLoading: false,
  spaces: {},
};

export default (
  state = initialState,
  action: {type: string; payload: SpaceType},
) => {
  switch (action.type) {
    case IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });

    case ADD_SPACE:
      state.spaces[action.payload.id] = Object.assign(
        {},
        state.spaces[action.payload.id],
        action.payload,
      );
      return Object.assign({}, state, {spaces: {...state.spaces}});
    case DELETE_SPACE:
      return Object.assign({}, state, {
        state: action.payload,
      });

    default:
      return state;
  }
};
