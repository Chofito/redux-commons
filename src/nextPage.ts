type NextPageConfigurationType = {
  clear: Array<string>;
  set: Array<string>;
  nextPageKey?: string;
  default: number;
};

type NextPageActionType = {
  type: string;
  payload: Object | number;
};

const nextPage = (configuration: NextPageConfigurationType) => (
  state: number = configuration.default,
  action: NextPageActionType,
): number => {
  const { clear, set, nextPageKey = 'nextPage' } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return configuration.default;
  }

  if (set != null && set.includes(action.type)) {
    if (typeof action.payload === 'object') {
      return action.payload[nextPageKey];
    }
    return action.payload;
  }

  return state;
};

export default nextPage;
