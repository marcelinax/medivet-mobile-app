import { SelectOptionProps } from 'types/components/Inputs/types';

export interface SelectedFilter {
  id: string;
  value: SelectOptionProps[];
}

export interface HandleApplyFilters {
  value: SelectOptionProps[];
}
