import { GenericActionType } from './types';

const withReplaceSubState = (reducer: Function) => (replaceActionTypes: Array<string>) => (
  state: unknown = reducer(undefined, {}),
  action: GenericActionType,
) => (replaceActionTypes.includes(action.type) ? action.payload : reducer(state, action));

export default withReplaceSubState;
