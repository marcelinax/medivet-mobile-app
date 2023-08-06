import { useEffect, useLayoutEffect, useState } from 'react';
import { VetAvailability } from 'types/api/vetAvailability/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { DefaultLayout } from 'layouts/Default.layout';
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { VetClinicAvailabilitiesScreenNavigationProps } from 'types/Navigation/types';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { View } from 'react-native';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { VetClinicAvailabilityCard } from 'components/Screens/Clinics/VetClinicAvailabilities/VetClinicAvailabilityCard';
import { ApiError } from 'types/api/error/types';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { FullScreenLoading } from 'components/Composition/FullScreenLoading';

export const VetClinicAvailabilitiesScreen = () => {
  const navigation = useNavigation<VetClinicAvailabilitiesScreenNavigationProps>();
  const [ availabilities, setAvailabilities ] = useState<VetAvailability[] | undefined>();
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const isFocused = useIsFocused();
  const [ removeLoading, setRemoveLoading ] = useState(false);

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
  }, [ isFocused ]);

  const fetchVetClinicAvailabilities = async (): Promise<void> => {
    try {
      const params = {
        vetId: user!.id,
        clinicId: clinic!.id,
        include: 'receptionHours,specialization',
      };
      const res = await VetAvailabilityApi.getVetAvailabilities(params);
      setAvailabilities([ ...res ]);
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

  const handleRemoveAvailability = () => {
    handleSuccessAlert();
    fetchVetClinicAvailabilities();
  };

  const drawAvailabilities = () => getAvailabilitiesGroupedBySpecialization().map((availability) => (
    <VetClinicAvailabilityCard
      availability={availability}
      key={`availability-${availability.id}`}
      onSuccessRemove={handleRemoveAvailability}
      setRemoveLoading={setRemoveLoading}
    />
  ));

  return (
    <DefaultLayout>
      <>
        <FullScreenLoading loading={removeLoading} />
        {drawErrorAlert(errors)}
        {drawSuccessAlert()}
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
