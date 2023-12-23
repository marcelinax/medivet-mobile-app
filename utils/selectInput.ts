import { SelectOptionProps } from 'types/components/Inputs/types';

export const parseDataToSelectOptions = (
  data: Record<string, any>,
  fieldAsLabel: string,
  fieldAsId: string,
  additionalFields?: string[],
): SelectOptionProps[] => data.map((item: Record<string, any>) => {
  const label = fieldAsLabel.split('.').reduce((acc, cur) => {
    if (acc) return acc[`${cur}`];
    return cur;
  }, item);

  const id = fieldAsId.toString().split('.').reduce((acc, cur) => {
    if (acc) return acc[`${cur}`];
    return cur;
  }, item);

  const itemAdditionalFields: Record<string, any> = {};
  if (additionalFields && additionalFields.length > 0) {
    additionalFields.forEach((field) => {
      if (field in item) {
        itemAdditionalFields[field] = item[field];
      }
    });
  }

  return ({
    id,
    label,
    additionalFields: itemAdditionalFields,
  });
});
