import { IdType, ErrorType } from './types';


type ErrorsConfigurationType = {
  clear?: Array<string>,
  idKey?: string,
  populate?: Array<string>,
};

type ErrorsActionType = {
  type: string,
  payload: {
    id: IdType,
    objectId: IdType,
  },
};

// TODO: Fix State Shape, should be ErrorType instead of any
const errors = (configuration: ErrorsConfigurationType) => (
  state: {[key in IdType]: any} = {},
  action: ErrorsActionType,
): {[key in IdType]: any} => {
  const { clear, populate, idKey = 'id' } = configuration;
  const { payload } = action;
  if (populate != null && populate.includes(action.type)) {
    if (typeof payload.objectId === 'number') {
      return {
        ...state,
        [payload.objectId]: action.payload,
      };
    }


    if (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string') {
      return {
        ...state,
        [payload[idKey]]: action.payload,
      };
    }

    return state;
  }

  if (clear != null && clear.includes(action.type)) {
    if (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string') {
      const newState = { ...state };
      delete newState[payload[idKey]];
      return newState;
    }

    return state;
  }

  return state;
};


export default errors;
