import { KeyExtractorAction, KeyExtractorConfiguration } from './types';

const keyExtractor = (configuration: KeyExtractorConfiguration) => (
  state: unknown = configuration.default,
  action: KeyExtractorAction,
  transform = _ => _,
): unknown => {
  const { clear, set, extractionKey } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return configuration.default;
  }

  if (set != null && set.includes(action.type)) {
    return transform(action.payload[extractionKey]);
  }

  return state;
};

export default keyExtractor;
