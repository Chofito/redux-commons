declare type CounterConfigurationType = {
    incremented?: Array<string>;
    decremented?: Array<string>;
    reset?: Array<string>;
};
declare type CounterActionType = {
    type: string;
    payload: {
        step: number;
    };
};
declare const counter: (configuration: CounterConfigurationType) => (state: number, action: CounterActionType) => number;
export default counter;
