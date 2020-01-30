declare type SingletonConfigurationType = {
    clear?: Array<string>;
    populate?: Array<string>;
    update?: Array<string>;
};
declare type SingletonActionType = {
    type: string;
    payload: Object;
};
declare const singleton: (configuration: SingletonConfigurationType) => (state: Object, action: SingletonActionType) => Object;
export default singleton;
