import { IdType, GenericAction } from './types';

export type SelectedConfigurationType = {
  selected?: Array<string>;
  allDeselected?: Array<string>;
  default?: IdType;
};

const selected = (configuration: SelectedConfigurationType) => (
  state: IdType | null = null,
  action: GenericAction,
): IdType | null => {
  const { allDeselected } = configuration;
  if (
    configuration.selected != null &&
    configuration.selected.includes(action.type)
  ) {
    if (
      typeof action.payload === 'number' ||
      typeof action.payload === 'string'
    ) {
      return action.payload;
    }

    return state;
  }

  if (allDeselected != null && allDeselected.includes(action.type)) {
    return configuration.default;
  }

  return state;
};

export default selected;
