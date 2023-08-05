import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import {
  VetClinicAvailabilityReceptionHourFormItem,
} from 'components/Forms/VetClinicAvailability/VetClinicAvailabilityReceptionHourFormItem';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ApiError } from 'types/api/error/types';
import { getInputErrors } from 'api/error/services';

interface Props {
  receptionHours: VetAvailabilityReceptionHourFormProps[];
  errors: ApiError[];
  onRemoveReceptionHour: () => void;
}

export const VetClinicAvailabilityReceptionHourFormList = ({ receptionHours, errors, onRemoveReceptionHour }: Props) => {
  const errorMessages = getInputErrors(errors, 'receptionHour');

  const getReceptionHourErrorByIndex = (index: number) => (errorMessages.length > 0
    ? errorMessages.find((error) => error.resource?.index === index) : undefined);

  return (
    <View style={styles.list}>
      {receptionHours.map((receptionHour, index) => (
        <VetClinicAvailabilityReceptionHourFormItem
          receptionHour={receptionHour}
          index={index}
          onRemove={onRemoveReceptionHour}
          error={getReceptionHourErrorByIndex(index)}
          key={`reception-hour-${receptionHour.day}-${receptionHour.hourFrom}-${receptionHour.hourTo}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
  },
});
