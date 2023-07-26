import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigation } from '@react-navigation/native';
import { CreateVetClinicAvailabilityReceptionHoursScreenNavigationProps } from 'types/Navigation/types';

interface Props {
  form?: VetAvailabilityReceptionHourFormProps;
}

export const VetClinicAvailabilityReceptionHourForm: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const navigation = useNavigation<CreateVetClinicAvailabilityReceptionHoursScreenNavigationProps>();

  return (
    <View>
      <Text>tak</Text>
    </View>
  );
};
