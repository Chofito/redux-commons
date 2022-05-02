import { TimestampAction, TimestampConfiguration } from './types';

const timestamp = (configuration: TimestampConfiguration) => (
  state: number = configuration.default,
  action: TimestampAction,
): number => {
  const { clear, set, timestampKey = 'timestamp' } = configuration;
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
