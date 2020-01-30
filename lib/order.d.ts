import { IdType } from './types';
export declare type OrderConfigurationType = {
    added?: Array<string>;
    fetched?: Array<string>;
    replaced?: Array<string>;
    removed?: Array<string>;
    confirmed?: Array<string>;
    cleared?: Array<string>;
    sorted?: Array<string>;
    idKey?: string;
    preferPrepend?: boolean;
};
export declare type OrderActionType = {
    type: string;
    payload: IdType | {
        order?: Array<IdType>;
        oldId?: IdType;
        newId?: IdType;
        oldIndex?: number;
        newIndex?: number;
    };
};
declare const order: (configuration: OrderConfigurationType) => (state: (string | number)[], action: OrderActionType) => (string | number)[];
export default order;
