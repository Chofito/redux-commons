export type SubstateMultiplexerActionType = OrderAction;

export type IdType = string | number;

export type SimpleReducerType = (state: any, action: any) => any;

export type MaybeErrorType = {} | Error;

export type GenericObjectType = {
  [key in IdType]: any;
};
export interface GenericObject {
  [key: string]: any;
}

export interface Error {
  objectId?: number;
  status: number;
  message: string;
  extra?: Object;
  retryAction?: Object;
}

export interface GenericAction {
  type: string;
  payload?: Object;
}

export interface ByIdConfiguration {
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
  cascade?: { [key: string]: string };
  customBehavior?: SimpleReducerType; // state, action => newState
}

export interface ByIdAction {
  type: string;
  payload:
    | IdType
    | {
        id?: IdType;
        entities?: GenericObjectType;
        order?: Array<IdType>;
        oldId?: IdType;
        newId?: IdType;
        key?: string;
        oldValues?: any;
        newValues?: any;
        atIndex?: any;
      };
}

export interface CounterConfiguration {
  incremented?: Array<string>;
  decremented?: Array<string>;
  reset?: Array<string>;
}

export interface CounterAction {
  type: string;
  payload: {
    step: number;
  };
}

export interface SubstateMultiplexerConfiguration {
  added?: Array<string>;
  fetched?: Array<string>;
  removed?: Array<string>;
  cleared?: Array<string>;
  replaced?: Array<string>;
  confirmed?: Array<string>;
  sorted?: Array<string>;
  preferPrepend?: boolean;
  allDeselected?: Array<string>;
  selected?: Array<string>;
  rehydrated?: Array<string>;
  idKey?: string;
  reducer: Function;
}

export interface SubstateMultiplexerState {
  byId: GenericObjectType;
  order: Array<IdType>;
  selected?: IdType;
  substates: Object;
}

export interface ErrorConfiguration {
  clear: Array<string>;
  populate: Array<string>;
}

export interface ErrorAction {
  type: string;
  payload: Error;
}

export interface ErrorsConfiguration {
  clear?: Array<string>;
  idKey?: string;
  populate?: Array<string>;
}

export interface ErrorsAction {
  type: string;
  payload: {
    id: IdType;
    objectId: IdType;
  };
}

export interface FetchingConfiguration {
  started?: Array<string>;
  succeed?: Array<string>;
  idKey?: string;
  failed?: Array<string>;
}

export interface FetchingAction {
  type: string;
  payload:
    | IdType
    | {
        id?: IdType;
        objectId?: IdType;
      };
}

export interface IsFetchingConfiguration {
  started?: Array<string>;
  succeed?: Array<string>;
  failed?: Array<string>;
}

export interface IsFetchingAction {
  type: string;
}

export interface KeyExtractorConfiguration {
  clear?: Array<string>;
  set?: Array<string>;
  extractionKey: string;
  transform?: Function;
  default: unknown;
}

export interface KeyExtractorAction {
  type: string;
  payload: Object;
}

export interface KeyExtractorByIdConfiguration {
  clear?: Array<string>;
  set?: Array<string>;
  extractionKey?: string;
  idKey?: string;
  default: unknown;
}

export interface KeyExtractorByIdAction {
  type: string;
  payload: Object;
}

export interface NextPageConfiguration {
  clear: Array<string>;
  set: Array<string>;
  nextPageKey?: string;
  default: number;
}

export interface NextPageAction {
  type: string;
  payload: Object | number;
}

export interface OrderConfiguration {
  added?: Array<string>;
  fetched?: Array<string>;
  replaced?: Array<string>;
  removed?: Array<string>;
  confirmed?: Array<string>;
  cleared?: Array<string>;
  sorted?: Array<string>;
  idKey?: string;
  preferPrepend?: boolean;
}

export interface OrderAction {
  type: string;
  payload:
    | IdType
    | {
        order?: Array<IdType>;
        oldId?: IdType;
        newId?: IdType;
        oldIndex?: number;
        newIndex?: number;
      };
}

export interface OrderByIdConfiguration {
  fetched?: Array<string>;
  replaced?: Array<string>;
  added?: Array<string>;
  removed?: Array<string>;
  changed?: Array<string>;
  elementChanged?: Array<string>;
  idKey?: string;
  orderKey?: string;
  elementKey?: string;
  newElementKey?: string;
}

export interface OrderByIdAction {
  type: string;
  payload: {
    order?: Array<IdType>;
  };
}

export interface SingletonConfiguration {
  clear?: Array<string>;
  populate?: Array<string>;
  update?: Array<string>;
};

export interface SingletonAction {
  type: string;
  payload: Object;
};

export interface TimestampConfiguration {
  clear: Array<string>;
  set: Array<string>;
  timestampKey?: string;
  default: number;
};

export interface TimestampAction {
  type: string;
  payload: Object | number;
};
