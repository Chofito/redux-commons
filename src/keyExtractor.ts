type KeyExtractorConfigurationType = {
  clear?: Array<string>;
  set?: Array<string>;
  extractionKey: string;
  default: unknown;
};

type KeyExtractorActionType = {
  type: string;
  payload: Object;
};

const keyExtractor = (configuration: KeyExtractorConfigurationType) => (
  state: unknown = configuration.default,
  action: KeyExtractorActionType,
): unknown => {
  const { clear, set, extractionKey } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return configuration.default;
  }

  if (set != null && set.includes(action.type)) {
    return action.payload[extractionKey];
  }

  return state;
};

export default keyExtractor;
