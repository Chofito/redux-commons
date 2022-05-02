import { SingletonAction, SingletonConfiguration } from './types';

const singleton = (configuration: SingletonConfiguration) => (
  state: Object | null = null,
  action: SingletonAction,
): Object | null => {
  const { clear, populate, update } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return null;
  }

  if (populate != null && populate.includes(action.type)) {
    return action.payload;
  }

  if (update != null && update.includes(action.type)) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export default singleton;
