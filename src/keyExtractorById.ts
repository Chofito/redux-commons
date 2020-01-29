import { IdType } from './types';

type KeyExtractorByIdConfigurationType = {
  clear?: Array<string>,
  set?: Array<string>,
  extractionKey?: string,
  idKey?: string,
  default: unknown,
};

type KeyExtractorByIdActionType = {
  type: string,
  payload: Object,
};

const keyExtractorById = (configuration: KeyExtractorByIdConfigurationType) => (
  state: {[key in IdType]: unknown} = {},
  action: KeyExtractorByIdActionType,
): unknown => {
  const {
    clear,
    set,
    extractionKey,
    idKey = 'id',
  } = configuration;
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
