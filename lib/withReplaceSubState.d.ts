import { GenericActionType } from './types';
declare const withReplaceSubState: (reducer: Function) => (replaceActionTypes: string[]) => (state: unknown, action: GenericActionType) => any;
export default withReplaceSubState;
