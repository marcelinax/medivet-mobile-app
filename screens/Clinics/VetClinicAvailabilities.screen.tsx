import { useEffect, useLayoutEffect, useState } from 'react';
import { VetAvailability } from 'types/api/vetAvailability/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { DefaultLayout } from 'layouts/Default.layout';
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigation } from '@react-navigation/native';
import { VetClinicAvailabilitiesScreenNavigationProps } from 'types/Navigation/types';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { View } from 'react-native';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { VetClinicAvailabilityCard } from 'components/Screens/Clinics/VetClinicAvailabilities/VetClinicAvailabilityCard';
import { ApiError } from 'types/api/error/types';

export const VetClinicAvailabilitiesScreen = () => {
  const navigation = useNavigation<VetClinicAvailabilitiesScreenNavigationProps>();
  const [ availabilities, setAvailabilities ] = useState<VetAvailability[] | undefined>();
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const [ errors, setErrors ] = useState<ApiError[]>([]);

  useEffect(() => {
    fetchVetClinicAvailabilities();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${navigationTranslations.CLINIC_AVAILABILITIES} "${clinic!.name}"`,
    });
  }, [ navigation ]);

  useEffect(() => {
    fetchVetClinicAvailabilities();
  }, [ navigation ]);

  const fetchVetClinicAvailabilities = async (): Promise<void> => {
    try {
      const params = {
        vetId: user!.id,
        clinicId: clinic!.id,
        include: 'receptionHours,specialization',
      };
      const res = await VetAvailabilityApi.getVetAvailabilities(params);
      setAvailabilities(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const getAvailabilitiesGroupedBySpecialization = () => {
    const groupedAvailabilities: VetAvailability[] = [];

    availabilities?.forEach((availability) => {
      const existingGroupedAvailability = groupedAvailabilities.find(
        (groupedAvailability) => groupedAvailability.specialization.id === availability.specialization.id,
      );
      if (existingGroupedAvailability) {
        const index = availabilities?.indexOf(existingGroupedAvailability);
        groupedAvailabilities[index] = {
          ...existingGroupedAvailability,
          receptionHours: [
            ...existingGroupedAvailability.receptionHours,
            ...availability.receptionHours,
          ],
        };
      } else {
        groupedAvailabilities.push(availability);
      }
    });

    return groupedAvailabilities;
  };

  const drawAvailabilities = () => getAvailabilitiesGroupedBySpecialization().map((availability) => (
    <VetClinicAvailabilityCard
      availability={availability}
      key={`availability-${availability.id}`}
    />
  ));

  return (
    <DefaultLayout>
      <>
        {drawErrorAlert(errors)}
        {
          !availabilities ? <LoadingContainer /> : (
            <View>
              {drawAvailabilities()}
            </View>
          )
        }
      </>
    </DefaultLayout>
  );
};
