import { SelectOptionProps } from 'types/components/Inputs/types';

export interface SelectedFilter {
  id: string;
  value: SelectOptionProps[] | SelectOptionProps;
}

export interface HandleApplyFilters {
  value: SelectOptionProps[] | SelectOptionProps;
}

export interface SearchVetsFilters {
  city?: string;
  specialization?: SelectOptionProps;
}
