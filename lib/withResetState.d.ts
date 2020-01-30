import { GenericActionType } from './types';
declare const withResetState: (reducer: Function) => (resetActionTypes: string[]) => (state: unknown, action: GenericActionType) => any;
export default withResetState;
