type IsFetchingConfigurationType = {
  started?: Array<string>;
  succeed?: Array<string>;
  failed?: Array<string>;
};

type IsFetchingActionType = {
  type: string;
};

const isFetching = (configuration: IsFetchingConfigurationType) => (
  state: boolean = false,
  action: IsFetchingActionType,
): boolean => {
  const { started, succeed, failed } = configuration;
  if (started != null && started.includes(action.type)) {
    return true;
  }

  if ((failed != null && failed.includes(action.type)) || (succeed != null && succeed.includes(action.type))) {
    return false;
  }

  return state;
};

export default isFetching;
