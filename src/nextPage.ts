import { NextPageAction, NextPageConfiguration } from './types';

const nextPage = (configuration: NextPageConfiguration) => (
  state: number = configuration.default,
  action: NextPageAction,
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
