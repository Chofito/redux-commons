type SingletonConfigurationType = {
  clear?: Array<string>,
  populate?: Array<string>,
  update?: Array<string>,
};

type SingletonActionType = {
  type: string,
  payload: Object,
};


const singleton = (configuration: SingletonConfigurationType) => (
  state: Object | null = null,
  action: SingletonActionType,
): Object | null => {
  const { clear, populate, update } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return null;
  }

  if (populate != null && populate.includes(action.type)) {
    return action.payload;
  }

  if (update != null && update.includes(action.type)) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};


export default singleton;
