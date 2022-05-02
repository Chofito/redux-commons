import { GenericAction } from './types';

const withReplaceSubState = (reducer: Function) => (replaceActionTypes: Array<string>) => (
  state: unknown = reducer(undefined, {}),
  action: GenericAction,
) => (replaceActionTypes.includes(action.type) ? action.payload : reducer(state, action));

export default withReplaceSubState;
