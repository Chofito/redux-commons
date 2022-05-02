import {
  IdType,
  KeyExtractorByIdAction,
  KeyExtractorByIdConfiguration,
} from './types';

const keyExtractorById = (configuration: KeyExtractorByIdConfiguration) => (
  state: { [key in IdType]: unknown } = {},
  action: KeyExtractorByIdAction,
): unknown => {
  const { clear, set, extractionKey, idKey = 'id' } = configuration;
  if (clear != null && clear.includes(action.type)) {
    return {
      ...state,
      [action.payload[idKey]]: undefined,
    };
  }

  if (set != null && set.includes(action.type)) {
    const { payload } = action;
    return {
      ...state,
      [payload[idKey]]: payload[extractionKey],
    };
  }

  return state;
};

export default keyExtractorById;
