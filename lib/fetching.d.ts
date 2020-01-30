import { IdType } from './types';
declare type FetchingConfigurationType = {
    started?: Array<string>;
    succeed?: Array<string>;
    idKey?: string;
    failed?: Array<string>;
};
declare type FetchingActionType = {
    type: string;
    payload: IdType | {
        id?: IdType;
        objectId?: IdType;
    };
};
declare const fetching: (configuration: FetchingConfigurationType) => (state: (string | number)[], action: FetchingActionType) => (string | number)[];
export default fetching;
