import { GenericActionType } from './types';

const withResetState = (reducer: Function) => (resetActionTypes: Array<string>) => (
  state: unknown = reducer(undefined, {}),
  action: GenericActionType,
) => (resetActionTypes.includes(action.type) ? reducer(undefined, {}) : reducer(state, action));

export default withResetState;
