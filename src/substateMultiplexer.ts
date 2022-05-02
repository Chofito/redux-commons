import { combineReducers } from 'redux';

import commonById from './byId';
import commonOrder from './order';
import commonSelected from './selected';

import {
  SubstateMultiplexerActionType,
  SubstateMultiplexerConfiguration,
  SubstateMultiplexerState,
} from './types';

const initialState = {
  byId: {},
  order: [],
  selected: null,
  substates: {},
};

const substateMultiplexer = (
  configuration: SubstateMultiplexerConfiguration,
) => {
  const byIdOrderAndSelectedReducer = combineReducers({
    byId: commonById({
      added: configuration.added,
      fetched: configuration.fetched,
      removed: configuration.removed,
      cleared: configuration.cleared,
      idKey: configuration.idKey,
    }),
    order: commonOrder({
      added: configuration.added,
      fetched: configuration.fetched,
      replaced: configuration.replaced,
      removed: configuration.removed,
      confirmed: configuration.confirmed,
      cleared: configuration.cleared,
      sorted: configuration.sorted,
      idKey: configuration.idKey,
      preferPrepend: configuration.preferPrepend,
    }),
    selected: commonSelected({
      selected: configuration.selected,
      allDeselected: configuration.allDeselected,
      default: null,
    }),
  });

  return (
    state: SubstateMultiplexerState = initialState,
    action: SubstateMultiplexerActionType,
  ): SubstateMultiplexerState => {
    // Initial run of the reducer needs to return the reference to the initial state
    if (
      configuration.rehydrated &&
      configuration.rehydrated.includes(action.type)
    ) {
      return state;
    }

    const { substates } = state;
    const newSubstates = { ...substates };
    const byIdOrderAndSelected = byIdOrderAndSelectedReducer(
      {
        byId: state.byId,
        order: state.order,
        selected: state.selected,
      },
      action,
    );
    const { byId, order } = byIdOrderAndSelected;
    let { selected } = byIdOrderAndSelected;

    // Select the first one if just added one and there was anything selected
    if (
      ((configuration.added && configuration.added.includes(action.type)) ||
        (configuration.fetched &&
          configuration.fetched.includes(action.type))) &&
      order.length > 0 &&
      selected === null
    ) {
      selected = order[0];
    }

    // Remove substate
    if (configuration.removed && configuration.removed.includes(action.type)) {
      const { payload } = action;
      if (typeof payload === 'number' || typeof payload === 'string') {
        delete newSubstates[payload];
      }
    }

    // Re-select if removed the one that is currently selected
    if (
      configuration.removed &&
      configuration.removed.includes(action.type) &&
      selected !== null &&
      !order.includes(selected)
    ) {
      // If there are another options, select the first one
      if (order.length > 0) {
        selected = order[0];

        // Mark that nothing is selected
      } else {
        selected = null;
      }
    }

    return {
      byId,
      order,
      selected,
      substates:
        selected != null
          ? {
              ...newSubstates,
              [selected]: configuration.reducer(newSubstates[selected], action),
            }
          : newSubstates,
    };
  };
};

export default substateMultiplexer;

export const reselectWithMultiplexer = (selector: Function): Function => (
  multiplexerState: SubstateMultiplexerState,
  ...args: Array<unknown>
) => {
  const { selected, substates } = multiplexerState;
  if (selected != null) {
    if (substates[selected] != null) {
      return selector(substates[selected], ...args);
    } else {
      throw new Error('Invalid selected substate');
    }
  } else {
    throw new Error('No substate is selected');
  }
};

export const multipleReselectsWithMultiplexer = ({
  selectors = {},
  excluded = [],
}: {
  selectors: { [key: string]: Function };
  excluded?: Array<string>;
}): { [key: string]: Function } => {
  const wSelectors = {};
  Object.keys(selectors)
    .filter(
      selectorName =>
        selectorName !== 'default' && !excluded.includes(selectorName),
    )
    .forEach(selectorName => {
      wSelectors[selectorName] = reselectWithMultiplexer(
        selectors[selectorName],
      );
    });

  return wSelectors;
};
