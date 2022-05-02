import { CounterAction, CounterConfiguration } from './types';

const counter = (configuration: CounterConfiguration) => (
  state: number = 0,
  action: CounterAction,
): number => {
  const { incremented, decremented, reset } = configuration;

  const { payload } = action;

  if (incremented != null && incremented.includes(action.type)) {
    if (typeof payload !== 'undefined') {
      return state + (payload.step || 1);
    }
  }

  if (decremented != null && decremented.includes(action.type)) {
    if (typeof payload !== 'undefined') {
      return state - (payload.step || 1);
    }
  }

  if (reset != null && reset.includes(action.type)) {
    return 0;
  }

  return state;
};

export default counter;
