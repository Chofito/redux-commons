import { ErrorType, MaybeErrorType } from './types';

type ErrorConfigurationType = {
  clear: Array<string>;
  populate: Array<string>;
};

type ErrorActionType = {
  type: string;
  payload: ErrorType;
};

const error = (configuration: ErrorConfigurationType) => (
  state: MaybeErrorType = {},
  action: ErrorActionType,
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
