import { ErrorType, MaybeErrorType } from './types';
declare type ErrorConfigurationType = {
    clear: Array<string>;
    populate: Array<string>;
};
declare type ErrorActionType = {
    type: string;
    payload: ErrorType;
};
declare const error: (configuration: ErrorConfigurationType) => (state: MaybeErrorType, action: ErrorActionType) => MaybeErrorType;
export default error;
