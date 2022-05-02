import {
  ByIdAction,
  ByIdConfiguration,
  GenericObjectType,
} from './types';

const byId = (configuration: ByIdConfiguration) => (
  state: GenericObjectType = {},
  action: ByIdAction,
): GenericObjectType => {
  const {
    added,
    updated,
    updatedInBulk,
    fetched,
    removed,
    cleared,
    confirmed,
    addedToArrayAttribute,
    removedFromArrayAttribute,
    replacedInArrayAttribute,
    defaultAttributes,
    cascade,
    idKey = 'id',
    customBehavior = (s: any, _a: any): any => s, // Identity reducer
  } = configuration;

  const { payload } = action;

  if (payload != null) {
    if (
      added != null &&
      added.includes(action.type) &&
      typeof payload === 'object' &&
      (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string')
    ) {
      return {
        ...state,
        [payload[idKey]]: {
          ...(defaultAttributes || {}),
          ...payload,
        },
      };
    }

    if (updated != null && updated.includes(action.type)) {
      if (
        typeof payload === 'object' &&
        (typeof payload[idKey] === 'number' ||
          typeof payload[idKey] === 'string')
      ) {
        return {
          ...state,
          [payload[idKey]]: {
            ...state[payload[idKey]],
            ...payload,
          },
        };
      }
    }

    if (updatedInBulk != null && updatedInBulk.includes(action.type)) {
      if (
        typeof payload === 'object' &&
        typeof payload.order !== 'undefined' &&
        payload.order.constructor === Array
      ) {
        const { order, ...attributes } = payload;
        const newState = {
          ...state,
        };

        order.forEach(id => {
          newState[id] = {
            ...state[id],
            ...attributes,
          };
        });

        return newState;
      } else if (
        typeof payload === 'object' &&
        typeof payload.entities === 'object'
      ) {
        const newState = {
          ...state,
        };

        Object.keys(payload.entities).forEach(id => {
          if (state[id] && payload.entities) {
            newState[id] = {
              ...state[id],
              ...payload.entities[id],
            };
          }
        });

        return newState;
      }
    }

    if (fetched != null && fetched.includes(action.type)) {
      if (typeof payload === 'object' && typeof payload.entities === 'object') {
        const newEntities = {};
        Object.keys(payload.entities).forEach(id => {
          newEntities[id] = {
            ...(defaultAttributes || {}),
            ...(payload.entities || {})[
              isNaN(parseInt(id)) ? id : parseInt(id, 10)
            ],
          };
        });

        return {
          ...state,
          ...newEntities,
        };
      }
    }

    if (removed != null && removed.includes(action.type)) {
      // TODO: handle payload object with id attribute
      // TODO: handle payload array
      if (typeof payload === 'number' || typeof payload === 'string') {
        const newState = {
          ...state,
        };

        delete newState[payload];
        return newState;
      }
    }

    if (confirmed != null && confirmed.includes(action.type)) {
      if (typeof payload === 'object') {
        const { oldId, newId, ...extra } = payload;

        if (
          typeof oldId !== 'undefined' &&
          typeof newId !== 'undefined' &&
          typeof state[oldId] !== 'undefined'
        ) {
          const newState = {
            ...state,
          };

          newState[newId] = {
            ...newState[oldId],
            ...extra,
            id: newId,
          };

          delete newState[oldId];
          return newState;
        }
        const newState = {};
        Object.keys(state).forEach(key => {
          newState[key] = {
            ...state[key],
          };
        });

        return newState;
      }
    } else if (typeof payload === 'object') {
      const { id } = payload;
      const newState = {
        ...state,
      };

      delete newState[id];
      return newState;
    }

    if (
      addedToArrayAttribute != null &&
      addedToArrayAttribute.includes(action.type)
    ) {
      if (typeof payload === 'object') {
        const id = payload[idKey];
        const { key, order = [], atIndex } = payload;
        if (typeof id !== 'undefined' && typeof state[id] !== 'undefined') {
          const oldOrder = state[id][key] || [];

          if (typeof atIndex !== 'undefined') {
            return {
              ...state,
              [id]: {
                ...state[id],
                [key]: [
                  ...oldOrder.slice(0, atIndex),
                  ...order.filter(i => !oldOrder.includes(i)),
                  ...oldOrder.slice(atIndex),
                ],
              },
            };
          }

          return {
            ...state,
            [id]: {
              ...state[id],
              [key]: [...oldOrder, ...order.filter(i => !oldOrder.includes(i))],
            },
          };
        }
      }

      return state;
    }

    if (
      removedFromArrayAttribute != null &&
      removedFromArrayAttribute.includes(action.type)
    ) {
      if (typeof payload === 'object') {
        const id = payload[idKey];
        const { key, order = [] } = payload;
        if (typeof id !== 'undefined' && typeof state[id] !== 'undefined') {
          const oldOrder = state[id][key] || [];
          return {
            ...state,
            [id]: {
              ...state[id],
              [key]: oldOrder.filter(i => !order.includes(i)),
            },
          };
        }
      }

      return state;
    }

    if (
      replacedInArrayAttribute != null &&
      replacedInArrayAttribute.includes(action.type)
    ) {
      if (typeof payload === 'object') {
        const id = payload[idKey];
        const { oldValues = [], newValues = [], key } = payload;
        if (typeof id !== 'undefined' && typeof state[id] !== 'undefined') {
          const oldOrder = state[id][key] || [];
          return {
            ...state,
            [id]: {
              ...state[id],
              [key]: oldOrder.map(oldValue =>
                oldValues.includes(oldValue)
                  ? newValues[oldValues.indexOf(oldValue)]
                  : oldValue,
              ),
            },
          };
        }
      }

      return state;
    }

    // REMEMBER THAT THIS CASCADE GIMMICK ONLY WORKS ONE LEVEL DEEP
    // If you want more depth, tie delete actions with sagas, but for most cases
    // this will do the trick.
    if (cascade != null) {
      const fk = cascade[action.type];
      if (typeof fk !== 'undefined') {
        if (typeof payload === 'number' || typeof payload === 'string') {
          const removedId = payload;

          const newState = {};
          Object.keys(state)
            .map(elementKey => state[parseInt(elementKey, 10)])
            .forEach(element => {
              if (
                typeof element[fk] !== 'undefined' &&
                element[fk] !== removedId
              ) {
                newState[element.id] = element;
              }
            });

          return newState;
        }
      }
    }

    if (cleared != null && cleared.includes(action.type)) {
      return {};
    }
  }

  return customBehavior(state, action);
};

export default byId;
