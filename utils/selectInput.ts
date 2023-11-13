import { SelectOptionProps } from 'types/components/Inputs/types';

export const parseDataToSelectOptions = (
  data: Record<string, any>,
  fieldAsLabel: string,
  fieldAsId: string,
): SelectOptionProps[] => data.map((item: Record<string, any>) => {
  const label = fieldAsLabel.split('.').reduce((acc, cur) => {
    if (acc) return acc[`${cur}`];
    return cur;
  }, item);

  const id = fieldAsId.toString().split('.').reduce((acc, cur) => {
    if (acc) return acc[`${cur}`];
    return cur;
  }, item);

  return ({
    id,
    label,
  });
});
