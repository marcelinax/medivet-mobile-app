import {SelectOptionProps} from "types/components/Inputs/types";

export const parseDataToSelectOptions = (data: Record<string, any>, fieldAsLabel: string, fieldAsId: string): SelectOptionProps[] => {
    return data.map((item: Record<string, any>) => ({
        id: item[fieldAsId],
        label: item[fieldAsLabel],
    }));
};
