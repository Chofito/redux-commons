import { IdType } from './types';
import { arrayMove } from './utils';

export type OrderConfigurationType = {
  added?: Array<string>;
  fetched?: Array<string>;
  replaced?: Array<string>;
  removed?: Array<string>;
  confirmed?: Array<string>;
  cleared?: Array<string>;
  sorted?: Array<string>;
  idKey?: string;
  preferPrepend?: boolean;
};

export type OrderActionType = {
  type: string;
  payload:
    | IdType
    | {
        order?: Array<IdType>;
        oldId?: IdType;
        newId?: IdType;
        oldIndex?: number;
        newIndex?: number;
      };
};

const order = (configuration: OrderConfigurationType) => (
  state: Array<IdType> = [],
  action: OrderActionType,
): Array<IdType> => {
  const {
    added,
    fetched,
    replaced,
    removed,
    confirmed,
    cleared,
    sorted,
    idKey = 'id',
    preferPrepend = false,
  } = configuration;

  const { payload } = action;

  if (added != null && added.includes(action.type)) {
    if (typeof payload === 'object' && (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string')) {
      return !preferPrepend ? [...state, payload[idKey]] : [payload[idKey], ...state];
    }
  }

  if (fetched != null && fetched.includes(action.type)) {
    if (typeof payload === 'object' && payload.order != null && payload.order.constructor === Array) {
      const stateSet = new Set(state);
      const difference = payload.order.filter(id => !stateSet.has(id));

      return [...state, ...difference];
    }
  }

  if (replaced != null && replaced.includes(action.type)) {
    if (typeof payload === 'object' && payload.order != null && payload.order.constructor === Array) {
      return payload.order;
    }
  }

  if (removed != null && removed.includes(action.type)) {
    if (typeof payload === 'object' && payload.order != null && payload.order.constructor === Array) {
      const stateSet = new Set(state);
      const difference = payload.order.filter(id => !stateSet.has(id));

      return [...state, ...difference];
    }
    if (typeof payload === 'number' || typeof payload === 'string') {
      return state.filter(id => id !== payload);
    }
    if (typeof payload === 'object' && typeof payload[idKey] !== 'undefined') {
      return state.filter(id => id !== payload[idKey]);
    }

    return state;
  }

  if (confirmed != null && confirmed.includes(action.type)) {
    if (typeof payload === 'object') {
      const { oldId = -1, newId = -1 } = payload;
      return state.map(i => (i === oldId ? newId : i));
    }
    return state;
  }

  if (cleared != null && cleared.includes(action.type)) {
    return [];
  }

  if (sorted != null && sorted.includes(action.type)) {
    if (typeof payload === 'object') {
      const { oldIndex, newIndex } = payload;
      if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
        return arrayMove(state, oldIndex, newIndex);
      }
    }
  }

  return state;
};

export default order;
