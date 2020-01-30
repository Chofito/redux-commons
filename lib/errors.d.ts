import { IdType } from './types';
declare type ErrorsConfigurationType = {
    clear?: Array<string>;
    idKey?: string;
    populate?: Array<string>;
};
declare type ErrorsActionType = {
    type: string;
    payload: {
        id: IdType;
        objectId: IdType;
    };
};
declare const errors: (configuration: ErrorsConfigurationType) => (state: {
    [x: string]: any;
    [x: number]: any;
}, action: ErrorsActionType) => {
    [x: string]: any;
    [x: number]: any;
};
export default errors;
