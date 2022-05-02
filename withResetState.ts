import { GenericAction } from './types';

const withResetState = (reducer: Function) => (
  resetActionTypes: Array<string>,
) => (state: unknown = reducer(undefined, {}), action: GenericAction) =>
  resetActionTypes.includes(action.type)
    ? reducer(undefined, {})
    : reducer(state, action);

export default withResetState;
