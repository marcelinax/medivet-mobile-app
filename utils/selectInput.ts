import { SelectOptionProps } from 'types/components/Inputs/types';

export const parseDataToSelectOptions = (
  data: Record<string, any>,
  fieldAsLabel: string,
  fieldAsId: string,
): SelectOptionProps[] => data.map((item: Record<string, any>) => ({
  id: item[fieldAsId].toString(),
  label: item[fieldAsLabel],
}));
