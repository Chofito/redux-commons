import { IsFetchingAction, IsFetchingConfiguration } from './types';

const isFetching = (configuration: IsFetchingConfiguration) => (
  state: boolean = false,
  action: IsFetchingAction,
): boolean => {
  const { started, succeed, failed } = configuration;
  if (started != null && started.includes(action.type)) {
    return true;
  }

  if (
    (failed != null && failed.includes(action.type)) ||
    (succeed != null && succeed.includes(action.type))
  ) {
    return false;
  }

  return state;
};

export default isFetching;
