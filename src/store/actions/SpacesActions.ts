import {IS_LOADING, ADD_SPACE, DELETE_SPACE} from '../ActionTypes';
import {SpaceType} from '../../types';

export const setIsLoading = (isLoading: boolean) => {
  return {
    type: IS_LOADING,
    payload: isLoading,
  };
};
export const addSpace = (space: SpaceType) => {
  return {
    type: ADD_SPACE,
    payload: space,
  };
};

export const deleteSpace = (space: SpaceType) => {
  return {
    type: DELETE_SPACE,
    payload: space,
  };
};
