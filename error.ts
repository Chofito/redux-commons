import {
  ErrorAction,
  ErrorConfiguration,
  MaybeErrorType,
} from './types';

const error = (configuration: ErrorConfiguration) => (
  state: MaybeErrorType = {},
  action: ErrorAction,
): MaybeErrorType => {
  const { clear, populate } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return {};
  }

  if (populate != null && populate.includes(action.type)) {
    return action.payload;
  }

  return state;
};

export default error;
