import { IdType, SimpleReducerType } from './types';
declare type ByIdConfigurationType = {
    added?: Array<string>;
    fetched?: Array<string>;
    updated?: Array<string>;
    updatedInBulk?: Array<string>;
    removed?: Array<string>;
    cleared?: Array<string>;
    confirmed?: Array<string>;
    addedToArrayAttribute?: Array<string>;
    removedFromArrayAttribute?: Array<string>;
    replacedInArrayAttribute?: Array<string>;
    defaultAttributes?: Object;
    idKey?: string;
    cascade?: {
        [key: string]: string;
    };
    customBehavior?: SimpleReducerType;
};
declare type ByIdActionType = {
    type: string;
    payload: IdType | {
        id?: IdType;
        entities?: {
            [key in IdType]: Object;
        };
        order?: Array<IdType>;
        oldId?: IdType;
        newId?: IdType;
        key?: string;
        oldValues?: any;
        newValues?: any;
        atIndex?: any;
    };
};
declare const byId: (configuration: ByIdConfigurationType) => (state: {
    [x: string]: any;
    [x: number]: any;
}, action: ByIdActionType) => {
    [x: string]: any;
    [x: number]: any;
};
export default byId;
