import { IdType, GenericActionType } from './types';
export declare type SelectedConfigurationType = {
    selected?: Array<string>;
    allDeselected?: Array<string>;
    default?: IdType;
};
declare const selected: (configuration: SelectedConfigurationType) => (state: string | number, action: GenericActionType) => string | number;
export default selected;
