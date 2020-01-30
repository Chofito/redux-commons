import { GenericActionType } from './types';
declare type ToggleConfigurationType = {
    turnedOn?: Array<string>;
    turnedOff?: Array<string>;
    default: boolean;
};
declare const toggle: (configuration: ToggleConfigurationType) => (state: boolean, action: GenericActionType) => boolean;
export default toggle;
