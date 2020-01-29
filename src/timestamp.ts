type TimestampConfigurationType = {
  clear: Array<string>,
  set: Array<string>,
  timestampKey?: string,
  default: number,
};

type TimestampActionType = {
  type: string,
  payload: Object | number,
};

const timestamp = (configuration: TimestampConfigurationType) => (
  state: number = configuration.default,
  action: TimestampActionType,
): number => {
  const {
    clear,
    set,
    timestampKey = 'timestamp',
  } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return configuration.default;
  }

  if (set != null && set.includes(action.type)) {
    if (typeof action.payload === 'object') {
      return action.payload[timestampKey];
    }
    return action.payload;
  }

  return state;
};


export default timestamp;
