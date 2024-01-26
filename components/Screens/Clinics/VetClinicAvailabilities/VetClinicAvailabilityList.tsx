import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { VetAvailability } from 'types/api/vetAvailability/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { VetClinicAvailabilityCard } from 'components/Screens/Clinics/VetClinicAvailabilities/VetClinicAvailabilityCard';
import { DefaultLayout } from 'layouts/Default.layout';
import { FullScreenLoading } from 'components/Composition/FullScreenLoading';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { View } from 'react-native';
import { EmptyList } from 'components/Composition/EmptyList';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

export const VetClinicAvailabilityList = () => {
  const navigation = useNavigation<NavigationProps>();
  const [ availabilities, setAvailabilities ] = useState<VetAvailability[] | undefined>();
  const { handleErrorAlert } = useErrorAlert();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const { handleSuccessAlert } = useSuccessAlert();
  const isFocused = useIsFocused();
  const [ removeLoading, setRemoveLoading ] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchVetClinicAvailabilities();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${t('navigation.clinic_availabilities.title')} "${clinic!.name}"`,
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
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
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
    <DefaultLayout withoutHorizontalPadding>
      <>
        <FullScreenLoading loading={removeLoading} />
        {
          !availabilities ? <LoadingContainer /> : availabilities.length === 0 ? <EmptyList /> : (
            <View>
              {drawAvailabilities()}
            </View>
          )
        }
      </>
    </DefaultLayout>
  );
};
