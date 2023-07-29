import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import {
  VetClinicAvailabilityReceptionHourFormItem,
} from 'components/Forms/VetClinicAvailability/VetClinicAvailabilityReceptionHourFormItem';
import { StyleSheet, View } from 'react-native';
import React from 'react';

interface Props {
  receptionHours: VetAvailabilityReceptionHourFormProps[];
}

export const VetClinicAvailabilityReceptionHourFormList = ({ receptionHours }: Props) => (
  <View style={styles.list}>
    {receptionHours.map((receptionHour, index) => (
      <VetClinicAvailabilityReceptionHourFormItem
        receptionHour={receptionHour}
        index={index}
        key={`reception-hour-${receptionHour.day}-${receptionHour.hourFrom}-${receptionHour.hourTo}`}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
  },
});
