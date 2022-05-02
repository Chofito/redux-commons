import {
  GenericObjectType,
  OrderByIdAction,
  OrderByIdConfiguration,
} from './types';

const orderById = (configuration: OrderByIdConfiguration) => (
  state: GenericObjectType = {},
  action: OrderByIdAction,
): GenericObjectType => {
  const {
    fetched,
    replaced,
    added,
    removed,
    changed,
    idKey = 'id',
    orderKey = 'order',
    elementKey = 'element',
    newElementKey = 'newElement',
  } = configuration;

  const { payload } = action;

  if (fetched != null && fetched.includes(action.type)) {
    const order = payload[orderKey];
    if (order && order.constructor === Array) {
      const objectId = payload[idKey];
      const originalOrder = state[objectId] || [];
      const stateSet = new Set(originalOrder);
      const difference = order.filter(id => !stateSet.has(id));

      return {
        ...state,
        [objectId]: [...originalOrder, ...difference],
      };
    }
  }

  if (added != null && added.includes(action.type)) {
    const objectId = payload[idKey];
    const toAdd = payload[elementKey];
    if (state[objectId] && !state[objectId].includes(toAdd)) {
      const originalOrder = state[objectId];

      return {
        ...state,
        [objectId]: [...originalOrder, toAdd],
      };
    }
  }

  if (removed != null && removed.includes(action.type)) {
    const objectId = payload[idKey];
    const toRemove = payload[elementKey];
    if (state[objectId] && state[objectId].includes(toRemove)) {
      const originalOrder = state[objectId];

      return {
        ...state,
        [objectId]: originalOrder.filter(i => i !== toRemove),
      };
    }
  }

  if (replaced != null && replaced.includes(action.type)) {
    const order = payload[orderKey];

    if (order && order.constructor === Array) {
      const objectId = payload[idKey];
      return {
        ...state,
        [objectId]: order,
      };
    }
  }

  if (changed != null && changed.includes(action.type)) {
    const objectId = payload[idKey];
    const toChange = payload[elementKey];
    const newValue = payload[newElementKey];

    if (state[objectId]) {
      const originalOrder = state[objectId];

      return {
        ...state,
        [objectId]: originalOrder.map(i => (i === toChange ? newValue : i)),
      };
    }
  }

  return state;
};

export default orderById;
