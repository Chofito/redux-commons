type CounterConfigurationType = {
  incremented?: Array<string>;
  decremented?: Array<string>;
  reset?: Array<string>;
};

type CounterActionType = {
  type: string;
  payload: {
    step: number;
  };
};

const counter = (configuration: CounterConfigurationType) => (state: number = 0, action: CounterActionType): number => {
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
